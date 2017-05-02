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
const mailCtrl = require('./controllers/mail')
const io = require('socket.io')();
const password = require('./password.json')

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
io.on('connection', socket => {
    debug('Client connected')
})
io.of('/lxtester').use((socket, next) => {
    if (socket.request.headers.passtoken === password.lxtester) return next();
    next(new Error('Authentication error'));
})
io.of('/lxtester').on('connection', socket => {
    debug('Lxtester connected')
    
})

module.exports = app;
