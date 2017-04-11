var router = require('koa-router')()
const crypto = require('crypto')
const ramdomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const FileSystem = mongoose.model('FileSystem')

router.post('/user', async ctx => {
    let data = ctx.request.body
    let hash = crypto.createHash('sha512').update(data.password).digest('hex')
    new User({
        name : data.username,
        password : hash
    }).save()//TODO:only for temporary usage
})

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

    let salt = randomstring(16)
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
})

module.exports = router
