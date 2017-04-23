var router = require('koa-router')()
const crypto = require('crypto')
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const FileSystem = mongoose.model('FileSystem')
const Session = mongoose.model('Session')
const userCtrl = require('../controllers/user')
const sessionCtrl = require('../controllers/session')

router.get('/user/:uid', async ctx => {
    let isSelf = (ctx.state.session && ctx.state.session.user._id.equals(ctx.params.uid))
    let userdata = await userCtrl.getUserById(ctx.params.uid, isSelf)
    if (!userdata) {
        ctx.status = 404
        ctx.body = {
            error: "No such user"
        }
        return
    }
    ctx.status = 200
    ctx.body = userdata
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
    //TODO: Verify if password is strong enough
    //TODO: Verify if email is valid
    try {
        let user = await userCtrl.createUser(data)
        //Auto login for the new created user
        let sessionid = await sessionCtrl.generateSession(user, false)
        ctx.status = 201
        ctx.body = {
            user: userCtrl.extractUserData(user, true),
            sessionid: sessionid
        }
    } catch (err) {
        if (err.name == "Conflict") {
            ctx.status = 409
            ctx.body = {
                error : err.message
            }
            return
        } else {
            throw err
        }
    }
})

module.exports = router
