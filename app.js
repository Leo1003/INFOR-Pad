const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const debug = require('debug')('INFOR-Pad:app');
const mongoose = require('mongoose');
const io = require('socket.io')();
require('./db.js');
const api = require('./routes/api');

//react
const serve = require('koa-static')
const router = require('./src/routes/router.js')

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

//logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(serve(`./dist`))
app.use(router.routes())
app.use(api.routes(), api.allowedMethods());

app.io = io;
io.on('connection', socket => {
    debug('Client connected');
});

module.exports = app;
