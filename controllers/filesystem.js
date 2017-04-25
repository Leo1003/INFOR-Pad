const hash = require('./hash')
const debug = require('debug')('INFOR-Pad:api')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')
const FileSystem = mongoose.model('FileSystem')

exports.extractFSData = async function (fs, complete) {
    let ret = {
        id: fs._id,
        name: fs.name,
        parent: fs.parent,
        owner: fs.owner,
        createDate: fs.createDate,
        modifyDate: fs.modifyDate,
        isPublic: fs.isPublic,
        format: fs.isFile === true ? fs.format : 'Directory'
    }
    if (complete == true) {
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
exports.isRootDir = function (fs) {
    if (fs.parent && fs.name == 'Root') {
        return true
    }
    return false
}
exports.findFS = async function (fsid) {
    return await FileSystem.findById(fsid)
}
exports.findFile = async function (fsid) {
    let fs = await exports.findFS(fsid)
    if (fs && fs.isFile == true) {
        return fs
    }
    return undefined
}
exports.findDir = async function (fsid) {
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
exports.getAccess = async function (fsid, userid) {
    let fs = await exports.findFS(fsid)
    if (!fs) {
        return undefined
    }
    if (userid && userid.equals(fs.owner)) {
        return 2
    } else if (fs.isPublic === true) {
        return 1
    } else {
        return 0
    }
}

exports.InsertFS = async function (fs, pfsid) {
    let pfs = await exports.findDir(pfsid)
    if (pfs) {
        fs.parent = pfs._id
        pfs.files.push(fs._id)
        pfs.modifyDate = new Date()
        await fs.save()
        await pfs.save()
        return fs
    } else {
        throw { name: "Not Found", message: "Can't not find parent dir!" }
    }
}

function chkValue(value, default, limit) {
    if (value instanceof String == true && value.length > limit) {
        throw { name: "Too Big", message: "Your data is too large to save!" }
    }
    return (value != undefined ? value : default)
}
exports.updateFS = async function (fs, data, limit) {
    fs.name = chkValue(data.filename, fs.name)
    fs.isPublic = chkValue(data.isPublic, fs.isPublic)
    if (fs.isFile === true) {
        fs.code = chkValue(data.code, fs.code, limit)
        fs.stdin = chkValue(data.stdin, fs.stdin, limit)
        if (data.format == 'Directory') {
            throw { name: "Format Error", message: "You can't change a file into a directory!" }
        }
        fs.format = chkValue(data.format, fs.format)
    }
    fs.modifyDate = new Date()
    fs = await fs.save()
    return fs
}

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
exports.Delete = Delete
exports.recursiveDelete = recursiveDelete
