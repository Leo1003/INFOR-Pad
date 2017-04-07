const session = require('./api-session')
const user = require('./api-user')
var router = require('koa-router')()

router.prefix('/api');

router.use(session.routes(), session.allowedMethods())
router.use(user.routes(), user.allowedMethods())

module.exports = router
