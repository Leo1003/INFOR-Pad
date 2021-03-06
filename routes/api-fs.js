var router = require('koa-router')()
const debug = require('debug')('INFOR-Pad:api')
const mongoose = require('mongoose')
const FileSystem = mongoose.model('FileSystem')
const fsCtrl = require('../controllers/filesystem')
const ApiError = require('../error').ApiError

router.prefix('/fs')

router.param('fsid', async(fsid, ctx, next) => {
    let fs = await fsCtrl.findFS(fsid)
    if (!fs) {
        throw new ApiError(404, "File not found")
    }
    let access = undefined
    if (fsCtrl.isTempFile(fs) == true) {
        access = fsCtrl.getAccess(fs, (ctx.header.secret ? ctx.header.secret : undefined))
    } else {
        access = fsCtrl.getAccess(fs, (ctx.state.session ? ctx.state.session.user._id : undefined))
    }
    if (!access || access == 0) {
        if (!ctx.state.session) {
            throw new ApiError(401, "Need authorized")
        } else {
            throw new ApiError(403, "Permission denied")
        }
    }
    ctx.state.access = access
    return await next()
})
router.param('tgfsid', async(tgfsid, ctx, next) => {
    if (!ctx.state.session) {
        throw new ApiError(401, "Need authorized")
    }
    let fsdir = await fsCtrl.findFS(tgfsid)
    let access = fsCtrl.getAccess(fsdir, ctx.state.session.user._id)
    if (access === undefined) {
        throw new ApiError(404, "Target Directory Not found")
    }
    if (access >= 2) {
        return await next()
    } else {
        throw new ApiError(403, "Permission denied")
    }
})

router.get('/', async ctx => {
    if (ctx.query.shortid) {
        let fs = await fsCtrl.findByShort(ctx.query.shortid)
        if (fs.isPublic == true) {
            ctx.status = 200
            ctx.body = await fsCtrl.extractFSData(fs, false, true)
        } else {
            throw new ApiError(403, "Document isn't public")
        }
    } else {
        throw new ApiError(400, "Invalid query parameter")
    }
})
router.get('/:fsid', async ctx => {
    if (ctx.state.access >= 1) {
        let fs = await fsCtrl.findFS(ctx.params.fsid)
        ctx.status = 200
        ctx.body = await fsCtrl.extractFSData(fs, true, true)
    } else {
        throw new ApiError(403, "Permission denied")
    }
})
router.post('/', async ctx => {
    let data = ctx.request.body
    if (!data.filename || !data.format) {
        throw new ApiError(400, "Some data are missed")
    }
    let newfile = await fsCtrl.addTempFile(data.filename, data.format, ctx.header.secret)
    newfile = fsCtrl.updateFS(newfile, data, 1024 * 128)
    await newfile.save()
    ctx.status = 201
    ctx.body = await fsCtrl.extractFSData(newfile, true)
})
router.post('/:fsid', async ctx => {
    if (ctx.state.access >= 2) {
        let data = ctx.request.body
        if (!data.filename || !data.format) {
            throw new ApiError(400, "Some data are missed")
        }
        let isfile = data.format != 'Directory'
        let newfile = new FileSystem({
            name: data.filename,
            description: data.description,
            owner: ctx.state.session.user._id,
            isFile: isfile === true,
            files: isfile === false ? [] : undefined,
            format: isfile === true ? data.format : undefined,
            code: isfile === true ? "" : undefined,
            stdin: isfile === true ? "" : undefined
        })
        newfile = fsCtrl.updateFS(newfile, data, 1024 * 128)
        newfile = await fsCtrl.link(newfile, ctx.params.fsid)
        ctx.status = 201
        ctx.body = await fsCtrl.extractFSData(newfile, true)
    } else {
        throw new ApiError(403, "Permission denied")
    }
})
router.put('/:fsid', async ctx => {
    if (ctx.state.access >= 2) {
        let fs = await fsCtrl.findFS(ctx.params.fsid)
        fs = fsCtrl.updateFS(fs, ctx.request.body, 1024 * 128)
        await fs.save()
        ctx.status = 200
        ctx.body = await fsCtrl.extractFSData(fs, true)
    } else {
        throw new ApiError(403, "Permission denied")
    }
})
router.put('/:fsid/:tgfsid', async ctx => {
    if (ctx.state.access >= 2) {
        let fs = await fsCtrl.findFS(ctx.params.fsid)
        let tgfs = await fsCtrl.findDir(ctx.params.tgfsid)
        if (fsCtrl.isRootDir(fs) == true) {
            throw new ApiError(400, "You can't move a root directory")
        }
        if (tgfs._id.equals(fs._id)) {
            throw new ApiError(400, "You can't move it into itself")
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
        let pfs = await fsCtrl.findDir(fs.parent)
        fs = await fsCtrl.unlink(fs, pfs)
        fs = await fsCtrl.link(fs, ctx.params.tgfsid)
        ctx.status = 200
        ctx.body = await fsCtrl.extractFSData(fs, true)
    } else {
        throw new ApiError(403, "Permission denied")
    }
})
router.delete('/:fsid', async ctx => {
    if (ctx.state.access >= 2) {
        {
            let fs = await fsCtrl.findFS(ctx.params.fsid)
            if (fsCtrl.isRootDir(fs) == true) {
                throw new ApiError(400, "You can't delete a root directory")
            }
        }
        let num = await fsCtrl.recursiveDelete(ctx.params.fsid)
        ctx.status = 200
        ctx.body = {
            count: num
        }
    } else {
        throw new ApiError(403, "Permission denied")
    }
})

module.exports = router