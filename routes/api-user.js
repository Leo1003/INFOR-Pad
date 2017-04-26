var router = require('koa-router')()
const crypto = require('crypto')
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const FileSystem = mongoose.model('FileSystem')
const Session = mongoose.model('Session')
const userCtrl = require('../controllers/user')
const sessionCtrl = require('../controllers/session')
const ApiError = require('../error').ApiError

router.get('/user/:uid', async ctx => {
    let isSelf = (ctx.state.session && ctx.state.session.user._id.equals(ctx.params.uid))
    let userdata = await userCtrl.getUserById(ctx.params.uid, isSelf)
    if (!userdata) {
        throw new ApiError(404, "No such user")
    }
    ctx.status = 200
    ctx.body = userdata
})
router.post('/user', async ctx => {
    let data = ctx.request.body
    if (!data.username || !data.password || !data.email) {
        throw new ApiError(400, "Some data are missed")
    }
    //TODO: Verify if password is strong enough
    //TODO: Verify if email is valid
    
    let user = await userCtrl.createUser(data)
    //Auto login for the new created user
    let sessionid = await sessionCtrl.generateSession(user, false)
    ctx.status = 201
    ctx.body = {
        user: userCtrl.extractUserData(user, true),
        sessionid: sessionid
    }
})

module.exports = router
