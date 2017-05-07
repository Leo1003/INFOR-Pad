var router = require('koa-router')()
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const userCtrl = require('../controllers/user')
const sessionCtrl = require('../controllers/session')
const mailCtrl = require('../controllers/mail')
const ApiError = require('../error').ApiError
const debug = require('debug')('INFOR-Pad:api')

router.prefix('/user')

router.get('/', async ctx => {
    let user = await userCtrl.getUserByName(ctx.query.name, null)
    let isSelf = (ctx.state.session && ctx.state.session.user._id.equals(user._id))
    ctx.status = 200
    ctx.body = userCtrl.extractUserData(user, isSelf)
})
router.get('/:uid', async ctx => {
    let isSelf = (ctx.state.session && ctx.state.session.user._id.equals(ctx.params.uid))
    let userdata = await userCtrl.getUserById(ctx.params.uid, isSelf)
    ctx.status = 200
    ctx.body = userdata
})
router.post('/', async ctx => {
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

    await userCtrl.sendMail(user, ctx.header.host)
})
router.post('/mail', async ctx => {
    if (ctx.state.session) {
        let user = ctx.state.session.user
        let stat = await userCtrl.sendMail(user, ctx.header.host)
        if (stat == true) {
            ctx.status = 201
            ctx.body = {
                mail: user.email
            }
        } else {
            ctx.status = 203
            ctx.body = {
                mail: user.email
            }
        }
    } else {
        throw new ApiError(401, "Login First!")
    }
})

module.exports = router