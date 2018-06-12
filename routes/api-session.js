var router = require('koa-router')()
const hash = require('../controllers/hash')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')
const userCtrl = require('../controllers/user')
const sessionCtrl = require('../controllers/session')
const ApiError = require('../error').ApiError

router.prefix('/session')

router.post('/', async ctx => {
    let data = ctx.request.body
    if (!data.username || !data.password) {
        throw new ApiError(400, "Some data are missed")
    }
    let user = await User.findOne({
        name: data.username
    })
    if (user) {
        let pwhash = hash.hashPassword(data.password, user.salt)
        if (pwhash === user.password) {
            let sessID = await sessionCtrl.generateSession(user, data.autoLogin)
            ctx.status = 200
            ctx.body = {
                sessionid: sessID,
                userid: user._id
            }
            return
        }
    }
    throw new ApiError(403, "The username or the password is wrong")
})
router.use(async (ctx, next) => {
    if (!ctx.state.session) {
        throw new ApiError(401, "You haven't login yet!")
    }
    await next()
})
router.get('/', async ctx => {
    ctx.status = 200
    ctx.body = {
        user: userCtrl.extractUserData(ctx.state.session.user, true),
        expire: ctx.state.session.expireAt,
        autoLogin: ctx.state.session.autoLogin
    }
})
router.delete('/', async ctx => {
    await sessionCtrl.removeSession(ctx.state.session)
    ctx.status = 200
    ctx.body = {}
})

module.exports = router
