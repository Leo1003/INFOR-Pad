const randomstring = require('randomstring')
const hash = require('./hash')
const userCtrl = require('./user')
const debug = require('debug')('INFOR-Pad:api')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')
const FileSystem = mongoose.model('FileSystem')
const ApiError = require('../error').ApiError

exports.extractFSData = async function(fs, complete, extend) {
    let ret = {
        id: fs._id,
        name: fs.name,
        description: fs.description,
        parent: fs.parent || "",
        owner: fs.owner,
        createDate: fs.createDate,
        modifyDate: fs.modifyDate,
        isPublic: fs.isPublic,
        shortid: (fs.shortid ? fs.shortid : ''),
        format: fs.isFile === true ? fs.format : 'Directory'
    }
    if (extend == true) {
        if (fs.parent) {
            await fs.populate('parent').execPopulate()
            ret.parent = await exports.extractFSData(fs.parent, false)
        } else {
            ret.parent = {}
        }
        if (fs.owner) {
            await fs.populate('owner').execPopulate()
            ret.owner = await userCtrl.extractUserData(fs.owner, false)
        }
    }
    if (complete == true) {
        ret.editSecret = fs.editSecret
        if (fs.isFile === true) {
            ret.code = fs.code
            ret.stdin = fs.stdin
        } else {
            ret.files = []
            let dir = await fs.populate('files').execPopulate()
            for (let chld of dir.files) {
                ret.files.push(await exports.extractFSData(chld, false))
            }
        }
    }
    return ret
}
exports.isRootDir = function(fs) {
    return (!fs.parent && fs.name == 'Root' && fs.isFile == false)
}
exports.isTempFile = function(fs) {
    return (!fs.parent && !fs.owner && fs.isFile == true)
}
exports.findFS = async function(fsid) {
    return await FileSystem.findById(fsid)
}
exports.findByShort = async function(id) {
    let fs = await FileSystem.findOne({ shortid: id })
    if (!fs) {
        throw new ApiError(404, "Invaild Short URL!")
    }
    return fs
}
exports.findFile = async function(fsid) {
    let fs = await exports.findFS(fsid)
    if (fs && fs.isFile == true) {
        return fs
    }
    return undefined
}
exports.findDir = async function(fsid) {
    let fs = await exports.findFS(fsid)
    if (fs && fs.isFile == false) {
        return fs
    }
    return undefined
}

/************************
 ***    getAccess     ***
 ************************
 2 = Read/Write
 1 = Read Only
 0 = No Access
 */
exports.getAccess = function(fs, userid) {
    //let fs = await exports.findFS(fsid)
    if (!fs) {
        return undefined
    }
    if (exports.isTempFile(fs) == true) {
        if (userid && userid == fs.editSecret) {
            return 2
        } else {
            return 1
        }
    } else {
        if (userid && userid.equals(fs.owner)) {
            return 2
        } else if (fs.isPublic === true) {
            return 1
        } else {
            return 0
        }
    }
}

exports.addTempFile = async function(name, format, description, secret) {
    return await new FileSystem({
        name: name,
        description: description,
        isFile: true,
        isPublic: true,
        shortid: randomstring.generate(8),
        editSecret: (secret ? secret : randomstring.generate(8)),
        format: format,
        code: "",
        stdin: ""
    }).save()
}

exports.link = async function(fs, pfsid) {
    let pfs = await exports.findDir(pfsid)
    if (pfs) {
        fs.parent = pfs._id
        pfs.files.push(fs._id)
        pfs.modifyDate = new Date()
        await fs.save()
        await pfs.save()
        return fs
    } else {
        throw new ApiError(404, "The parent isn't a directory!")
    }
}

function chkValue(value, def, limit) {
    if (value instanceof String == true && value.length > limit) {
        throw new ApiError(413, "Your data is too large to save!")
    }
    return (value != undefined ? value : def)
}
exports.updateFS = async function(fs, data, limit) {
    if (exports.isRootDir(fs) == false) {
        fs.name = chkValue(data.filename, fs.name)
    }
    fs.isPublic = chkValue(data.isPublic, fs.isPublic)
    fs.description = chkValue(data.description, fs.description, 1024)
    if (fs.isFile === true) {
        fs.code = chkValue(data.code, fs.code, limit)
        fs.stdin = chkValue(data.stdin, fs.stdin, limit)
        if (data.format == 'Directory') {
            throw new ApiError(400, "You can't change a file into a directory!")
        }
        fs.format = chkValue(data.format, fs.format)
    }
    if (fs.isPublic == true && !fs.shortid) {
        fs.shortid = randomstring.generate(8)
    }
    fs.modifyDate = new Date()
    fs = await fs.save()
    return fs
}

async function unlink(fs, parent) {
    let index = parent.files.indexOf(fs._id)
    if (index == -1) {
        console.error('!!WARNING!!');
        console.error(new ApiError(507, `Parent doesn't contain file: ${fs._id}`))
    } else {
        parent.files.splice(index, 1)
        parent.modifyDate = new Date()
        await parent.save()
    }
    fs.depopulate('parent')
    fs.parent = undefined
    return fs
}
async function Delete(id) {
    let fs = await FileSystem.findById(id).populate('parent')
    if (!fs) {
        throw new ApiError(404, "File doesn't exist")
    }
    if (fs.isFile == false && fs.files.length > 0) {
        throw new ApiError(507, `Directory ${fs._id} isn't empty`)
    }
    if (fs.parent.isFile == true) {
        throw new ApiError(400, `Parent is not a directory: ${fs.parent._id}`)
    }
    if (fs.parent) {
        await unlink(fs, fs.parent)
    }
    await fs.remove()
    return 1
}
async function recursiveDelete(id) {
    let fs = await FileSystem.findById(id)
    if (!fs) {
        throw new ApiError(404, "File doesn't exist")
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
exports.unlink = unlink
exports.Delete = Delete
exports.recursiveDelete = recursiveDelete