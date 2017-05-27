const hash = require('./hash');
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const debug = require('debug')('INFOR-Pad:userController')
const User = mongoose.model('User')
const FileSystem = mongoose.model('FileSystem')
const Session = mongoose.model('Session')
const MailValidation = mongoose.model('MailValidation')
const fsCtrl = require('./filesystem')
const mailCtrl = require('../controllers/mail')
const ApiError = require('../error').ApiError

function extractUserData(user, privData) {
    let ret = {}
    if (!user) {
        return undefined
    } else {
        if (privData === null) {
            return user
        }
        ret.id = user._id
        ret.name = user.name
        ret.level = user.level
        ret.createDate = user.createDate
        if (privData == true) {
            ret.lastLogin = user.lastLogin
            ret.email = user.email
            ret.rootfsid = user.root
            debug(user.settings)
            ret.settings = user.settings
        }
    }
    return ret
}
exports.extractUserData = extractUserData

exports.getUserById = async function (userid, privData, nothrow) {
    let user = await User.findById(userid)
    if (!user && nothrow == true) {
        throw new ApiError(404, "No such user")
    }
    return extractUserData(user, privData)
}

exports.getUserByName = async function (username, privData, nothrow) {
    let user = await User.findOne({ name: new RegExp(username, 'i') })
    if (!user && nothrow == false) {
        throw new ApiError(404, "No such user")
    }
    return extractUserData(user, privData)
}

exports.getUserByMail = async function (email, privData, nothrow) {
    let user = await User.findOne({ email: email })
    if (!user && nothrow == false) {
        throw new ApiError(404, "No such user")
    }
    return extractUserData(user, privData)
}

exports.createUser = async function (option) {
    //*** Test if existed
    if (await exports.getUserByName(option.username, false, true)) {
        throw new ApiError(409, "Username has already been taken!")
    }
    if (await exports.getUserByMail(option.email, false, true)) {
        throw new ApiError(409, "Email address has already been used!")
    }
    let salt = randomstring.generate(16)
    let user = new User({
        name: option.username,
        password: hash.hashPassword(option.password, salt),
        salt: salt,
        email: option.email
    })
    let root = await new FileSystem({
        name: "Root",
        isFile: false,
        owner: user._id,
        files: []
    }).save()
    user.root = root._id
    user = await user.save()
    return user
}

let settingsArray = [
    "theme",
    "fontSize",
    "showGutter",
    "highlightActiveLine",
    "wrapEnabled",
    "enableBasicAutocompletion",
    "enableLiveAutocompletion",
    "tabSize",
    "keyboardHandler"
]

exports.updateSettinngs = async function (user, settings) {
    try {
        for (let name of settingsArray) {
            if (settings[name]) {
                user.settings[name] = settings[name]
            }
        }
        user.markModified('settings')
        await user.save()
    } catch (err) {
        if (err.name == 'ValidationError') {
            throw new ApiError(400, "Invalid settings")
        }
        throw err
    }
}

exports.sendMail = async function (user, domain) {
    if (user.level == 0) {
        let old_mail = await MailValidation.find({ user: user._id, sentAt: { $gt: new Date(Date.now() - 10*60*1000) }, action: 'SignupCheck' })

        if (old_mail.length > 0) {
            throw new ApiError(403, "You have sent an E-mail in the past 10 minutes. Please try again later!")
        }
        let mailobj = mailCtrl.createMail({
            userid: user._id,
            action: 'SignupCheck',
            domain: domain
        })
        mailCtrl.sendMail(mailobj).then(data => {
            debug('Send Mail Complete!')
        }).catch(err => {
            console.error(err)
        })
        return true
    } else {
        return false
    }
}