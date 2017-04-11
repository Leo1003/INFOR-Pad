var router = require('koa-router')()
const crypto = require('crypto')
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const FileSystem = mongoose.model('FileSystem')
const Session = mongoose.model('Session')

router.post('/user', async ctx => {
    let data = ctx.request.body
    if (!data.username || !data.password || !data.email) {
        ctx.status = 400
        ctx.body = {
            error : "miss some data"
        }
        return
    }
    //*** Test if existed
    try {
        let samename = await User.findOne({ name : data.username })
        if (samename) {
            ctx.status = 409
            ctx.body = {
                error : "Username has already been taken!"
            }
            return
        }
        let samemail = await User.findOne({ name : data.username })
        if (samemail) {
            ctx.status = 409
            ctx.body = {
                error : "Email address has already been used!"
            }
            return
        }

        let salt = randomstring.generate(16)
        let hash = crypto.createHmac('RSA-SHA512', salt).update(data.password).digest('hex')
        let user = await new User({
            name : data.username,
            password : hash,
            salt : salt,
            email : data.email
        }).save()
        let root = await new FileSystem({
            name: "Root",
            isFile: false,
            owner: user._id
        }).save()
        user.root = root._id
        user = await user.save()

        //TODO:Add email verify

        //Auto login for the new created user
        let sessID = randomstring.generate(32)
        let expireDate = new Date()
        expireDate.setTime(expireDate.getTime() + 3600 * 1000)
        autologin = false
        await new Session({
            uuid: crypto.createHash('sha512').update(sessID).digest('hex'),
            expireAt: expireDate,
            user: user._id,
            autoLogin: false
        }).save()
        ctx.status = 201
        ctx.body = {
            sessionID: sessID,
            name: user.name
        }
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            error: err
        }
    }
})

module.exports = router
