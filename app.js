require('./db.js');
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const debug = require('debug')('INFOR-Pad:app');
const mongoose = require('mongoose');
const sessionCtrl = require('./controllers/session')
const fsCtrl = require('./controllers/filesystem')
const mailCtrl = require('./controllers/mail')
const io = require('socket.io')();
const password = require('./password.json')
const lxtesterServer = require('./lxtester').lxtesterServer()

const api = require('./routes/api');

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

mailCtrl.verifyConfig().then(verified => {
    if (verified == false) {
        console.error('Mail config verify failed!')
        console.error('Mail verify will not work!')
    } else {
        console.error('Mail verify successfully!')
    }
})

// routes
app.use(api.routes(), api.allowedMethods());

app.io = io
io.use(await (socket, next) => {
    let sess = await sessionCtrl.getSessionById(socket.request.headers.sessionid)
    if (sess) {
        if (sess.expireAt > new Date()) {
            sess = await sess.populate('user').execPopulate()
            if (sess.user) {
                return next()
            }
        }
    }
    next(new Error('Authentication Failed!'))
})
io.on('connection', socket => {
    debug('Client connected')
    socket.on('Submit', async data => {
        lxtesterServer.sendJob({
            socketid: socket.id,
            language: data.language,
            file: await fsCtrl.findFile(data.fileid)
        })
    })
})
io.of('/lxtester').use((socket, next) => {
    if (socket.request.headers.passtoken === password.lxtester) return next()
    next(new Error('Authentication error'))
})
io.of('/lxtester').on('connection', socket => {
    debug('lxtester connected')
    lxtesterServer.push(socket.id)
    socket.on('Result', data => {
        let task = lxtesterServer.receiveJob(socket.id, data)
        io.sockets.socket(task.socketid).emit('Result', task.result)
    })
    socket.on('disconnecting', data => {
        let uncompleted = lxtesterServer.remove(socket.id)
        for (let task in uncompleted) {
            io.sockets.socket(task.socketid).emit('Result', {
                //TODO: Uncompleted
            })
        }
    })
})

module.exports = app;
