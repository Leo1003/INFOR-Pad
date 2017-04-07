var router = require('koa-router')()
const crypto = require('crypto')
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.post('/user', async ctx => {
    let data = ctx.request.body
    let hash = crypto.createHash('sha512').update(data.password).digest('hex')
    new User({
        name : data.username,
        password : hash//,
        //root : { type: Schema.Types.ObjectId, ref: 'Directory' }
    }).save()//TODO:only for temporary usage
})

module.exports = router
