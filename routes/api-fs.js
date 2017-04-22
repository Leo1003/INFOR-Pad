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
    } else {
        ctx.status = 404
        ctx.body = {
            error: "Not found"
        }
        return
    }
/************************
 ***  Access Control  ***
 ************************
 ctx.state.access
 2 = Read/Write
 1 = Read Only
 0 = No Access
 */
    if (ctx.state.session && ctx.state.session.user._id.equals(fs.owner)) {
        ctx.state.access = 2
        return await next()
    } else if (fs.isPublic === true) {
        ctx.state.access = 1
        return await next()
    } else {
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
})
router.param('tgfsid', async (tgfsid, ctx, next) => {
    if (!ctx.state.session) {
        ctx.status = 401
        ctx.body = {
            error: "Need authorized"
        }
        return
    }
    let tgfs = await FileSystem.findById(tgfsid)
    if (!tgfs) {
        ctx.status = 404
        ctx.body = {
            error: "Target Directory Not found"
        }
        return
    }
    if (ctx.state.session.user._id.equals(tgfs.owner)) {
        if (tgfs.isFile == false) {
            ctx.state.tgfs = tgfs
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
        let fs = ctx.state.fs
        let resBody = {
            id: fs._id,
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
            fs = await fs.populate('files').execPopulate()
            fs.files.forEach(filedb => {
                resBody.files.push({
                    id: filedb._id,
                    name: filedb.name,
                    createDate: filedb.createDate,
                    modifyDate: filedb.modifyDate,
                    isPublic: filedb.isPublic,
                    format: filedb.isFile == true ? filedb.format : 'Directory'
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
router.post('/fs/:fsid', async ctx => {
    if (ctx.state.access >= 2) {
        let fs = ctx.state.fs
        if (fs.isFile === false) {
            let data = ctx.request.body
            if (!data.filename || !data.format) {
                ctx.status = 400
                ctx.body = {
                    error: "Some data are missed"
                }
                return
            }
            let isfile = data.format != 'Directory'
            let newfile = await new FileSystem({
                name: data.filename,
                parent: fs._id,
                owner: ctx.state.session.user._id,
                isFile: isfile === true,
                format: isfile === true ? data.format : undefined,
                code: isfile === true ? "" : undefined,
                stdin: isfile === true ? "" : undefined
            }).save()
            fs.files.push(newfile._id)
            fs.modifyDate = new Date()
            fs = await fs.save()
            ctx.status = 201
            ctx.body = {
                id: newfile._id
            }
        } else {
            ctx.status = 400
            ctx.body = {
                error: "Not a directory"
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
        let fs = ctx.state.fs
        let data = ctx.request.body
        if (data.filename) fs.name = data.filename
        if (data.isPublic) fs.isPublic = (data.isPublic == true ? true : false)
        if (fs.isFile === true) {
            if (data.code) {
                if (data.code.length > 1024*128) {
                    ctx.status = 413
                    ctx.body = {
                        error: "Your code is too large"
                    }
                    return
                }
                fs.code = data.code
            }
            if (data.stdin) {
                if (data.stdin.length > 1024*128) {
                    ctx.status = 413
                    ctx.body = {
                        error: "Your stdin is too large"
                    }
                    return
                }
                fs.stdin = data.stdin
            }
            if (data.format) {
                if (data.format == 'Directory') {
                    ctx.status = 400
                    ctx.body = {
                        error: "You can't change a file into a directory"
                    }
                    return
                }
                fs.format = data.format
            }
        }
        fs.modifyDate = new Date()
        fs = await fs.save()
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
        let fs = ctx.state.fs
        let tgfs = ctx.state.tgfs
        if (!ctx.state.fs.parent) {
            ctx.status = 400
            ctx.body = {
                error: "You can't move a root directory"
            }
            return
        }
        fs = await fs.populate('parent').execPopulate()
        let index = fs.parent.files.indexOf(fs._id)
        if (index == -1) {
            throw new Error(`Parent doesn't contain file: ${fs._id}`)
        }
        fs.parent.files.splice(index, 1)
        await fs.parent.save()
        fs.depopulate('parent')
        fs.parent = tgfs._id
        fs.modifyDate = new Date()
        tgfs.files.push(fs._id)
        tgfs.modifyDate = new Date()
        fs = await fs.save()
        tgfs = await tgfs.save()
        ctx.status = 200
        ctx.body = {
            fsid: fs._id,
            newParent: tgfs._id
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
        let parent = await findById(ctx.state.fs.parent)
        parent.modifyDate = new Date()
        parent = await parent.save()
        let num = 0
        try {
            num = await recursiveDelete(ctx.state.fs._id)
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

async function Delete(id) {
    let fs = await FileSystem.findById(id)
    if (!fs) {
        throw new Error("File doesn't exist")
    }
    if (fs.isFile == false && fs.files.length > 0) {
        throw new Error(`Directory ${fs._id} isn't empty`)
    }
    fs = await fs.populate('parent').execPopulate()
    if (fs.parent.isFile == true) {
        throw new Error(`Parent is not a directory: ${fs.parent._id}`)
    }
    let index = fs.parent.files.indexOf(fs._id)
    if (index == -1) {
        throw new Error(`Parent doesn't contain file: ${fs._id}`)
    }
    fs.parent.files.splice(index, 1)
    await fs.parent.save()
    await fs.remove()
    return 1
}

async function recursiveDelete(id) {
    let fs = await FileSystem.findById(id)
    if (!fs) {
        throw new Error("File doesn't exist")
    }
    if (fs.isFile == true) {
        return await Delete(id)
    } else {
        let count = 0
        for (let fileid of fs.files) {
            count += await recursiveDelete(fileid)
        }
        count += await Delete(id)
        return count
    }
}

module.exports = router
