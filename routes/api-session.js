var router = require('koa-router')()
const crypto = require('crypto')
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')

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
        let hash = crypto.createHmac('RSA-SHA512', user.salt).update(data.password).digest('hex')
        if (hash === user.password) {
            let sessID = randomstring.generate(32)
            let expireDate = new Date()
            let autologin = false
            if (data.autoLogin == true) {
                expireDate.setTime(expireDate.getTime() + 14 * 86400 * 1000)
                autologin = true
            } else {
                expireDate.setTime(expireDate.getTime() + 3600 * 1000)
                autologin = false
            }
            user.lastLogin = new Date()
            await user.save()
            await new Session({
                uuid: crypto.createHash('sha512').update(sessID).digest('hex'),
                expireAt: expireDate,
                user: user._id,
                autoLogin: autologin
            }).save()
            ctx.status = 200
            ctx.body = {
                sessionid: sessID,
                name: user.name
            }
            return
        }
    }
    ctx.status = 403
    ctx.body = {
        error: "The username or the password is wrong"
    }
})

router.delete('/session', async ctx => {
    if (!ctx.state.session) {
        ctx.status = 403
        ctx.body = {
            error: "You haven't login yet!"
        }
        return
    }
    await ctx.state.session.remove()

    ctx.status = 200
    ctx.body = {}
})

module.exports = router
