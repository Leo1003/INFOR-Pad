var router = require('koa-router')()
const crypto = require('crypto')
const ramdomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')

router.post('/session', async ctx => {
    let data = ctx.request.body
    if (!data.username || !data.password) {
        ctx.status = 400
        return
    }
    let user = await User.findOne({
        name: data.username
    })
    let hash = crypto.createHmac('RSA-SHA512', user.salt).update(data.password).digest('hex')
    if (user) {
        if (hash === user.password) {
            let sessID = ramdomstring.generate(32)
            let expireDate = new Date()
            let autologin = false
            if (data.autoLogin == true) {
                expireDate.setTime(expireDate.getTime() + 14 * 86400 * 1000)
                autologin = true
            } else {
                expireDate.setTime(expireDate.getTime() + 3600 * 1000)
                autologin = false
            }
            await new Session({
                uuid: crypto.createHash('sha512').update(sessID).digest('hex'),
                expireAt: expireDate,
                user: user._id,
                autoLogin: autologin
            }).save()
            ctx.status = 200
            ctx.body = {
                sessionID: sessID,
                name: user.name
            }
            return
        }
    }
    ctx.status = 403
})

router.delete('/session', async ctx => {
    if (!ctx.state.session) {
        ctx.status = 403
        ctx.body = {
            error: "You haven't login yet!"
        }
        return
    }
    /*
    let sess = await Session.findOne({
        uuid: ctx.header.sessionID
    })
    await sess.remove()
    */
    try{
        await ctx.state.session.remove()
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            error: err
        }
        return
    }

    ctx.status = 200
    ctx.body = {}
})

module.exports = router
