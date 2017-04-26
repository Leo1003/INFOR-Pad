const randomstring = require('randomstring')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const User = mongoose.model('User')
const FileSystem = mongoose.model('FileSystem')
const Session = mongoose.model('Session')
const userCtrl = require('./user')
const sessionCtrl = require('./session')
const ApiError = require('../error').ApiError
const mailConf = require('../mail.json')

exports.verifyConfig = async function () {
    let transporter = nodemailer.createTransport(mailConf)
    try {
        await ransporter.verify()
        return true
    } catch (err) {
        return false
    }
}

exports.createMail = function (opt) {

}

exports.sendMail = function (mail) {

}
