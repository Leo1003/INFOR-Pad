const session = require('./api-session')
var router = require('koa-router')()

router.prefix('/api');

router.use(session.routes(), session.allowedMethods())

module.exports = router
