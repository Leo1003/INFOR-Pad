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
            error: "Can't find the fsid"
        }
        return
    }
})
/************************
 ***  Access Control  ***
 ************************
    ctx.state.access
        2 = Read/Write
        1 = Read Only
        0 = No Access
 */
router.param('fsid', async (fsid, ctx, next) => {
    if (ctx.state.session.user && ctx.state.session.user._id == ctx.state.fs.owner) {
        ctx.state.access = 2
        return next()
    } else if (ctx.state.fs.isPublic === true) {
        ctx.state.access = 1
        return next()
    } else {
        if (!ctx.state.session.user) {
            ctx.status = 401
            ctx.body = {
                error: "Need authorized"
            }
        } else {
            ctx.status = 403
            ctx.body = {
                error: "Permission denied"
            }
        }
        return
    }
}

router.route('/fs/:fsid')
    .get(async ctx => {
        if (ctx.state.access >= 1) {
            let fs = ctx.state.fs
            let resBody = {
                name: fs.name,
                parent: fs.parent,
                owner: fs.owner,
                createDate: fs.createDate,
                modifyDate: fs.modifyDate,
                isPublic: fs.isPublic,
                format: fs.isFile === true ? fs.format : 'Directory'
            }
            if (fs.isFile === true) {
                ctx.status = 200
                resBody.code = fs.code
                resBody.stdin = fs.stdin
            } else {
                ctx.status = 200
                resBody.files = []
                fs = await fs.populate('files')
                fs.files.forEach(filedb => {
                    resBody.files.push({
                        name: filedb.name,
                        createDate: filedb.createDate,
                        modifyDate: filedb.modifyDate,
                        isPublic: filedb.isPublic,
                        format: filedb.isFile === true ? filedb.format : 'Directory'
                    })
                })
            }
            ctx.status = 200
            ctx.body = resBody
        } else {
            ctx.status = 403
            ctx.body = {
                error: "Permission denied"
            }
        }
    })

module.exports = router
