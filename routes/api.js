const session = require('./api-session')
const user = require('./api-user')
const fs = require('./api-fs')
var router = require('koa-router')()
const crypto = require('crypto')
const debug = require('debug')('INFOR-Pad:api')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')

router.prefix('/api')

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
        debug("Can't find header")
        return next()
    }
    let idhash = crypto.createHash('sha512').update(ctx.header.sessionid).digest('hex')
    let sess = await Session.findOne({
        uuid: idhash
    }).populate('user').exec()
    if (sess && sess.user) {
        if (sess.expireAt > new Date()) {
            //Auto renew session
            let expireDate = new Date()
            if (sess.autoLogin == true) {
                expireDate.setTime(expireDate.getTime() + 14 * 86400 * 1000)
            } else {
                expireDate.setTime(expireDate.getTime() + 3600 * 1000)
            }
            sess.expireAt = expireDate
            await sess.save()
            ctx.state.session = sess
            return next()
        }
    }
    debug("Expired!")
    ctx.status = 401
    ctx.body = {
        error: "Invalid session!"
    }
    return
})

router.use(session.routes(), session.allowedMethods())
router.use(user.routes(), user.allowedMethods())
router.use(fs.routes(), fs.allowedMethods())

module.exports = router
