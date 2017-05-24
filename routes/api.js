const session = require('./api-session')
const user = require('./api-user')
const fs = require('./api-fs')
var router = require('koa-router')()
const debug = require('debug')('INFOR-Pad:api')
const mongoose = require('mongoose')
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

router.get('/lxtester', async ctx => {
    if (ctx.state.session && ctx.state.session.user.level >= 3) {
        let ret = []
        for (let id in ctx.app.lxtesterServer.clients) {
            let lx = ctx.app.lxtesterServer.clients[id]
            ret.push({
                id: id,
                pending: lx.pending,
                suspend: lx.suspend
            })
        }
        ctx.status = 200
        ctx.body = ret
    } else {
        ctx.status = 403
        ctx.body = {
            error: "Permission denied."
        }
    }
})

router.use(session.routes(), session.allowedMethods())
router.use(user.routes(), user.allowedMethods())
router.use(fs.routes(), fs.allowedMethods())

module.exports = router
