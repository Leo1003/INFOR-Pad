const session = require('./api-session')
const user = require('./api-user')
var router = require('koa-router')()
const debug = require('debug')('INFOR-Pad:vaildation')
const mongoose = require('mongoose')
const Session = mongoose.model('Session')
const sessionCtrl = require('../controllers/session')
const mailCtrl = require('../controllers/mail')
const ApiError = require('../error').ApiError

router.prefix('/vaildation')

router.get('/:secret', async ctx => {
    try {
        let action = mailCtrl.executeAction(ctx.params.secret)
        //TODO: Redirect to action page
    } catch (err) {
        if (err instanceof ApiError) {
            //TODO: Redirect to failed page
        }
    }
})

module.exports = router