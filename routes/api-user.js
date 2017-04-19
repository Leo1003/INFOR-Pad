var router = require('koa-router')()
const crypto = require('crypto')
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const FileSystem = mongoose.model('FileSystem')
const Session = mongoose.model('Session')

router.get('/user/:uid', async ctx => {
    let user = await User.findById(ctx.params.uid)
    if (!user) {
        ctx.status = 404
        ctx.body = {
            error: "No such user"
        }
        return
    }
    let resBody = {
        name: user.name,
        level: user.level,
        createDate: user.createDate
    }
    if (ctx.state.session && ctx.state.session.user._id.equals(ctx.params.uid)) {
        resBody.email = user.email
        resBody.lastLogin = user.lastLogin
        resBody.rootfsid = user.root
    }
    ctx.status = 200
    ctx.body = resBody
})
router.post('/user', async ctx => {
    let data = ctx.request.body
    if (!data.username || !data.password || !data.email) {
        ctx.status = 400
        ctx.body = {
            error : "Some data are missed"
        }
        return
    }
    //*** Test if existed
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
    await new Session({
        uuid: crypto.createHash('sha512').update(sessID).digest('hex'),
        expireAt: expireDate,
        user: user._id,
        autoLogin: false
    }).save()
    ctx.status = 201
    ctx.body = {
        userid: user._id,
        sessionid: sessID,
        name: user.name
    }
})

module.exports = router
