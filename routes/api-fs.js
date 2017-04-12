var router = require('koa-router')()
const crypto = require('crypto')
const debug = require('debug')('INFOR-Pad:api')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')
const FileSystem = mongoose.model('FileSystem')

router.param('fsid', async (fsid, ctx, next) => {
    let fs = await FileSystem.findById(fsid)
    if (fs) {
        ctx.state.fs = fs
        return next()
    } else {
        ctx.status = 404
        ctx.body = {
            error : "Can't find the fsid"
        }
        return
    }
})
router.route('/fs/:fsid')
    .get(async ctx => {
        if (ctx.state.session.user && ctx.state.session.user._id === ctx.state.fs.owner) {

        }
        if (ctx.state.fs.isPublic === true) {

        }
        ctx.status = 403
        ctx.body = {
            error: "Permission denied"
        }
    })

module.exports = router
