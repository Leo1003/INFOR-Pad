var router = require('koa-router')()
const crypto = require('crypto')
const debug = require('debug')('INFOR-Pad:api')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')
const FileSystem = mongoose.model('FileSystem')
const fsCtrl = require('../controllers/filesystem')

router.param('fsid', async (fsid, ctx, next) => {
    let access = await fsCtrl.getAccess(fsid, (ctx.state.session ? ctx.state.session.user._id : undefined))
    if (access === undefined) {
        ctx.status = 404
        ctx.body = {
            error: "Not found"
        }
        return
    }
    if (access == 0) {
        if (!ctx.state.session) {
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
    ctx.state.access = access
    return await next()
})
router.param('tgfsid', async (tgfsid, ctx, next) => {
    if (!ctx.state.session) {
        ctx.status = 401
        ctx.body = {
            error: "Need authorized"
        }
        return
    }
    let access = await fsCtrl.getAccess(tgfsid, ctx.state.session.user._id)
    if (access === undefined) {
        ctx.status = 404
        ctx.body = {
            error: "Target Directory Not found"
        }
        return
    }
    if (access >= 2) {
        if (await fsCtrl.findDir(tgfsid)) {
            return await next()
        } else {
            ctx.status = 400
            ctx.body = {
                error: "Target MUST BE a directory"
            }
        }
    } else {
        ctx.status = 403
        ctx.body = {
            error: "Permission denied"
        }
    }
})

router.get('/fs/:fsid', async ctx => {
    if (ctx.state.access >= 1) {
        let fs = await fsCtrl.findFS(ctx.params.fsid)
        ctx.status = 200
        ctx.body = fsCtrl.extractFSData(fs)
    } else {
        ctx.status = 403
        ctx.body = {
            error: "Permission denied"
        }
    }
})
router.post('/fs/:fsid', async ctx => {
    if (ctx.state.access >= 2) {
        if (!data.filename || !data.format) {
            ctx.status = 400
            ctx.body = {
                error: "Some data are missed"
            }
            return
        }
        try {
            let data = ctx.request.body
            let isfile = data.format != 'Directory'
            let newfile = new FileSystem({
                name: data.filename,
                owner: ctx.state.session.user._id,
                isFile: isfile === true,
                format: isfile === true ? data.format : undefined,
                code: isfile === true ? "" : undefined,
                stdin: isfile === true ? "" : undefined
            })
            newfile = await fsCtrl.link(newfile, ctx.params.fsid)
            ctx.status = 201
            ctx.body = {
                id: newfile._id
            }
        } catch (err) {
            if (err.name == "Not Found") {
                ctx.status = 400
                ctx.body = {
                    error: "Not a directory"
                }
            } else {
                throw err
            }
        }
    } else {
        ctx.status = 403
        ctx.body = {
            error: "Permission denied"
        }
    }
})
router.put('/fs/:fsid', async ctx => {
    if (ctx.state.access >= 2) {
        let fs = await fsCtrl.findFS(ctx.params.fsid)
        let data = ctx.request.body
        try {
            fs = await fsCtrl.updateFS(fs, ctx.request.body, 1024*128)
        } catch (err) {
            if (err.name == "Too Big") {
                ctx.status = 413
                ctx.body = {
                    error: err.message
                }
            } else if (err.name == "Format Error") {
                ctx.status = 400
                ctx.body = {
                    error: err.message
                }
            } else {
                throw err
            }
            return
        }
        ctx.status = 200
        ctx.body = {
            id: fs._id
        }
    } else {
        ctx.status = 403
        ctx.body = {
            error: "Permission denied"
        }
    }
})
router.put('/fs/:fsid/:tgfsid', async ctx => {
    if (ctx.state.access >= 2) {
        let fs = await fsCtrl.findFS(ctx.params.fsid)
        let tgfs = await fsCtrl.findDir(ctx.params.tgfsid)
        if (fsCtrl.isRootDir(tgfs) == true) {
            ctx.status = 400
            ctx.body = {
                error: "You can't move a root directory"
            }
            return
        }
        if (tgfs._id.equals(fs._id)) {
            ctx.status = 400
            ctx.body = {
                error: "You can't move it into itself"
            }
            return
        }
        if (tgfs._id.equals(fs.parent)) {
            //Don't do anything if already in the the target directory
            ctx.status = 202
            ctx.body = {
                fsid: ctx.params.fsid,
                newParent: ctx.params.tgfsid
            }
            return
        }
        try {
            let pfs = await fsCtrl.findDir(fs.parent)
            fs = await fsCtrl.unlink(fs, pfs)
            fs = await fsCtrl.link(fs, ctx.params.tgfsid)
        } catch (err) {
            if (err.name == "Delete") {
                ctx.status = 507
                ctx.body = {
                    error: err.message
                }
            } else if (err.name == "Not Found") {
                ctx.status = 404
                ctx.body = {
                    error: err.message
                }
            } else {
                throw err
            }
            return
        }
        ctx.status = 200
        ctx.body = {
            fsid: fs._id,
            newParent: ctx.params.tgfsid
        }
    } else {
        ctx.status = 403
        ctx.body = {
            error: "Permission denied"
        }
    }
})
router.delete('/fs/:fsid', async ctx => {
    if (ctx.state.access >= 2) {
        if (!ctx.state.fs.parent) {
            ctx.status = 400
            ctx.body = {
                error: "You can't delete a root directory"
            }
            return
        }
        let parent = await FileSystem.findById(ctx.state.fs.parent)
        parent.modifyDate = new Date()
        parent = await parent.save()
        let num = 0
        try {
            num = await fsCtrl.recursiveDelete(ctx.state.fs._id)
        } catch (err) {
            ctx.status = 507
            ctx.body = err.message
            return
        }
        ctx.status = 200
        ctx.body = {
            count: num
        }
    } else {
        ctx.status = 403
        ctx.body = {
            error: "Permission denied"
        }
    }
})

module.exports = router
