const session = require('./api-session')
const user = require('./api-user')
const fs = require('./api-fs')
var router = require('koa-router')()
const crypto = require('crypto')
const debug = require('debug')('INFOR-Pad:api')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')
const sessionCtrl = require('../controllers/session')
const ApiError = require('../error').ApiError

router.prefix('/api')

//Api Error Handler
router.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof ApiError) {
            ctx.status = err.status
            ctx.body = {
                error: err.message
            }
            return
        } else if (err instanceof mongoose.CastError) {
            if (err.kind == 'ObjectId') {
                ctx.status = 404
                ctx.body = {
                    error: "Invalid ID!"
                }
                return
            }
        }
        ctx.status = 500
        ctx.body = {
            error: err.message
        }
        console.error(err)
    }
})

router.use(async (ctx, next) => {
    if (!ctx.header.sessionid) {
        return await next()
    }
    let sess = await sessionCtrl.getSessionById(ctx.header.sessionid)
    if (sess) {
        if (sess.expireAt > new Date()) {
            sess = await sess.populate('user').execPopulate()
            if (sess.user) {
                //Auto renew session
                ctx.state.session = await sessionCtrl.renewSession(sess)
                return await next()
            }
        }
    }
    throw new ApiError(401, "Session invalid or expired!")
})

router.use(session.routes(), session.allowedMethods())
router.use(user.routes(), user.allowedMethods())
router.use(fs.routes(), fs.allowedMethods())

module.exports = router
