const hash = require('./hash');
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const FileSystem = mongoose.model('FileSystem')
const Session = mongoose.model('Session')
const fsCtrl = require('./filesystem')
const ApiError = require('../error').ApiError

function extractUserData(user, privData) {
    let ret = {}
    if (!user) {
        return undefined
    } else {
        ret.id = user._id
        ret.name = user.name
        ret.level = user.level
        ret.createDate = user.createDate
        if (privData == true) {
            ret.lastLogin = user.lastLogin
            ret.email = user.email
            ret.rootfsid = user.root
        }
    }
    return ret
}
exports.extractUserData = extractUserData

exports.getUserById = async function (userid, privData) {
    let user = await User.findById(userid)
    if (!user) {
        throw new ApiError(404, "No such user")
    }
    return extractUserData(user, privData)
}

exports.getUserByName = async function (username, privData) {
    let user = await User.findOne({name: new RegExp(username, 'i')})
    if (!user) {
        throw new ApiError(404, "No such user")
    }
    return extractUserData(user, privData)
}

exports.getUserByMail = async function (email, privData) {
    let user = await User.findOne({email: email})
    if (!user) {
        throw new ApiError(404, "No such user")
    }
    return extractUserData(user, privData)
}

exports.createUser = async function (option) {
    //*** Test if existed
    if (await exports.getUserByName(option.username)) {
        throw new ApiError(409, "Username has already been taken!")
    }
    if (await exports.getUserByMail(option.email)) {
        throw new ApiError(409, "Email address has already been used!")
    }
    let salt = randomstring.generate(16)
    let user = new User({
        name : option.username,
        password : hash.hashPassword(option.password, salt),
        salt : salt,
        email : option.email
    })
    let root = await new FileSystem({
        name: "Root",
        isFile: false,
        owner: user._id,
        files: []
    }).save()
    user.root = root._id
    user = await user.save()

    //TODO:Add email verify

    return user
}
