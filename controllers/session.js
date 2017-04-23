const hash = require('./hash')
const randomstring = require('randomstring')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Session = mongoose.model('Session')

function getExpireDate(autologin) {
    let timeout = (autologin == true ? 14*86400*1000 : 3600*1000)
    return new Date(Date.now() + timeout)
}

exports.generateSession = async function (user, autologin) {
    if (!user) {
        throw new Error("Invalid user!")
    }
    let sessID = randomstring.generate(32)
    let expireDate = getExpireDate(autologin)
    user.lastLogin = new Date()
    await user.save()
    await new Session({
        uuid: hash.hashSessionId(sessID),
        expireAt: expireDate,
        user: user._id,
        autoLogin: autologin
    }).save()
    return sessID
}

exports.renewSession = async function (session) {
    session.expireAt = getExpireDate(session.autologin)
    await session.save()
    return session
}
