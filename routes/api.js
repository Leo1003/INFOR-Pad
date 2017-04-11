const session = require('./api-session')
const user = require('./api-user')
var router = require('koa-router')()
const crypto = require('crypto')
const debug = require('debug')('INFOR-Pad:api');
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')

router.prefix('/api');

router.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            error: err.message
        }
        console.error(err)
    }
})

router.use(async (ctx, next) => {
    if (!ctx.header.sessionid) {
        return next()
    }
    let idhash = crypto.createHash('sha512').update(ctx.header.sessionid).digest('hex')
    let sess = await Session.findOne({
        uuid: idhash
    }).populate('user').exec()
    if (sess && sess.user) {
        if (sess.expireAt > new Date()) {
            //Auto renew session
            if (sess.autoLogin == true) {
                sess.expireAt.setTime(sess.expireAt.getTime() + 14 * 86400 * 1000)
            } else {
                sess.expireAt.setTime(sess.expireAt.getTime() + 3600 * 1000)
            }
            await sess.save()
            ctx.state.session = sess
        }
    }
    return next()
})

router.use(session.routes(), session.allowedMethods())
router.use(user.routes(), user.allowedMethods())

module.exports = router
