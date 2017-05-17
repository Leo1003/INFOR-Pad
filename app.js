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
const lxtesterServer = new(require('./lxtester').lxtesterServer)()

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
app.use(async(ctx, next) => {
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
io.of('/client').use((socket, next) => {
    debug("Client connecting...")
    socket.sessionData = {}
    if (socket.handshake.query.sessionid) {
        sessionCtrl.getSessionById(socket.handshake.query.sessionid).then((sess => {
                if (sess && sess.expireAt > new Date()) {
                    return sess.populate('user').execPopulate()
                }
                debug("Client Failed")
                throw new Error('Session invaild or expired!')
            }))
            .then(sess => {
                if (sess.user._id) {
                    socket.sessionData.userid = sess.user._id
                    return next()
                }
                debug("Client Failed")
                throw new Error('Invaild user!')
            })
            .catch(err => {
                debug(err)
                next(err)
            })
    } else {
        next()
    }
})
io.of('/client').on('connection', socket => {
    debug('Client connected')
    socket.on('Submit', data => {
        let sid = socket.id
        fsCtrl.findFile(data.fileid).then(fs => {
            if (!fs) {
                throw new Error('File not found')
            }
            if (fsCtrl.getAccess(fs, socket.sessionData.userid) > 0) {
                lxtesterServer.sendJob({
                    socketid: sid,
                    language: data.language,
                    file: fs
                })
            } else {
                throw new Error('Permission denied')
            }
        }).catch(err => {
            socket.emit('Result', {
                id: -1,
                type: 2,
                time: -1,
                memory: -1,
                exitcode: 0,
                signal: 0,
                killed: true,
                output: '',
                error: err.message
            })
        })
    })
})
io.of('/lxtester').use((socket, next) => {
    if (socket.request.headers.passtoken === password.lxtester) return next()
    next(new Error('Authentication error'))
})
io.of('/lxtester').on('connection', socket => {
    debug('lxtester connected')
    lxtesterServer.push(socket)
    socket.on('Result', data => {
        let task = lxtesterServer.receiveJob(socket.id, data)
        io.of('/client').connected[task.socketid].emit('Result', task.result)
    })
    socket.on('disconnecting', data => {
        let uncompleted = lxtesterServer.remove(socket.id)
            /*
                    for (let task in uncompleted) {
                        io.of('/client').connected[task.socketid].emit('Result', {
                            id: task.id,
                            type: 2,
                            time: -1,
                            memory: -1,
                            exitcode: 0,
                            signal: 0,
                            killed: true,
                            output: '',
                            error: 'Server Stopped.'
                        })
                    }
            */
    })
})

module.exports = app;