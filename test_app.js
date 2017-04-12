const Koa = require('koa')
const app = new Koa();
const views = require('koa-views')
const serve = require('koa-static')

import router from './src/routes/router.js'

app.use(serve(`./dist`))

app.use(router.routes())

app.listen(3000)

module.exports = app
