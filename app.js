require('./db.js');
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const cors = require('@koa/cors')
const debug = require('debug')('INFOR-Pad:app');
const mongoose = require('mongoose');
const sessionCtrl = require('./controllers/session')
const fsCtrl = require('./controllers/filesystem')
const mailCtrl = require('./controllers/mail')
const io = require('socket.io')();
const password = require('./password.json')
const lxtesterServer = new(require('./lxtester').lxtesterServer)()

const api = require('./routes/api')
const vaildation = require('./routes/mail-vaildation')

//react
const serve = require('koa-static')
const router = require('./src/server/router.js')

// error handler
onerror(app);

// middlewares
app.use(cors());
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

app.lxtesterServer = lxtesterServer
// routes
app.use(api.routes(), api.allowedMethods())
app.use(vaildation.routes(), vaildation.allowedMethods())
// react routes
app.use(serve(__dirname + '/dist'))
app.use(serve(__dirname + '/semantic/dist'))
app.use(router.routes())
app.use(router.allowedMethods())

app.io = io
io.of('/client').use((socket, next) => {
    debug("Client connecting...")
    socket.sessionData = {}
    socket.submission = {}
    if (socket.handshake.query.sessionid) {
        sessionCtrl.getSessionById(socket.handshake.query.sessionid).then((sess => {
                if (sess && sess.expireAt > new Date()) {
                    return sess.populate('user').execPopulate()
                }
                debug("Client Failed")
                throw new Error('Session invalid or expired!')
            }))
            .then(sess => {
                if (sess.user._id) {
                    socket.sessionData.userid = sess.user._id
                    return next()
                }
                debug("Client Failed")
                throw new Error('Invalid user!')
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
            if (socket.submission.id != undefined) {
                throw new Error('Has already had one task')
            }
            if (fsCtrl.getAccess(fs, socket.sessionData.userid) > 0) {
                if (data.stdin) {
                    fs.stdin = data.stdin
                }
                socket.submission.id = lxtesterServer.sendJob({
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
    socket.on('Cancel', data => {
        io.of('/lxtester').emit('Cancel', { id: socket.submission.id })
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
        let clientsocket = io.of('/client').connected[task.socketid]
        if (clientsocket) {
            clientsocket.emit('Result', task.result)
            clientsocket.submission.id = undefined
        }
    })
    socket.on('Name', data => {
        lxtesterServer.setName(socket.id, data.name)
    })
    socket.on('Suspend', data => {
        lxtesterServer.suspend(socket.id)
    })
    socket.on('Resume', data => {
        lxtesterServer.resume(socket.id)
    })
    socket.on('disconnecting', data => {
        let uncompleted = lxtesterServer.remove(socket.id)
    })
})

module.exports = app;
