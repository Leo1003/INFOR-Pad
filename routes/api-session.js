var router = require('koa-router')()
const hash = require('../controllers/hash')
const crypto = require('crypto')
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')
const userCtrl = require('../controllers/user')
const sessionCtrl = require('../controllers/session')

router.post('/session', async ctx => {
    let data = ctx.request.body
    if (!data.username || !data.password) {
        ctx.status = 400
        ctx.body = {
            error: "Some data are missed"
        }
        return
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
    ctx.status = 403
    ctx.body = {
        error: "The username or the password is wrong"
    }
})
router.use(async (ctx, next) => {
    if (!ctx.state.session) {
        ctx.status = 401
        ctx.body = {
            error: "You haven't login yet!"
        }
        return
    }
    await next()
})
router.get('/session', async ctx => {
    ctx.status = 200
    ctx.body = {
        user: userCtrl.extractUserData(ctx.state.session.user, true),
        expire: ctx.state.session.expireAt,
        autoLogin: ctx.state.session.autoLogin
    }
})
router.delete('/session', async ctx => {
    await sessionCtrl.removeSession(ctx.state.session)
    ctx.status = 200
    ctx.body = {}
})

module.exports = router
