const randomstring = require('randomstring')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const User = mongoose.model('User')
const Session = mongoose.model('Session')
const MailValidation = mongoose.model('MailValidation')
const userCtrl = require('./user')
const sessionCtrl = require('./session')
const ApiError = require('../error').ApiError
const mailConf = require('../mail.json')
const hash = require('./hash')

var verified = undefined

exports.getVerified = function () {
    return verified
}

exports.verifyConfig = async function () {
    let transporter = nodemailer.createTransport(mailConf.nodemailerTransport)
    try {
        await transporter.verify()
        verified = true
    } catch (err) {
        console.error(err.message)
        verified = false
    } finally {
        return verified
    }
}

exports.createMail = function (option) {
    let sec = randomstring.generate(64)
    let mailva = new MailValidation({
        secret: hash.hashSessionId(sec),
        user: option.userid,
        action: option.action,
        expireAt: new Date(Date.now() + 12*3600*1000)
    })
    return {
        secret: sec,
        maildb: mailva
    }
}

exports.sendMail = async function (mail) {
    let user = await userCtrl.findById(mail.maildb.user)
    let transporter = nodemailer.createTransport(mailConf.nodemailerTransport)
    let mailOptions = {
        from: `"INFOR-Pad" <${mailConf.MailAddress}>`,
        to: user.email,
        subject: 'Verify your identity'
    }
    if (mail.maildb.action == 'SignupCheck') {
        mailOptions.html = `
<h1>Thank you for becoming a member of INFOR-Pad</h1>
</br>
<p>To complete your register progress. Please click the link below.
   We will lead you to the last step to the full function access.</p>
<a href="${mailConf.MailLinkDomain}/validation/${mail.secret}">Link</a>
<p>If the link is unavailabled you can copy the plain text link, and paste it to the browser.</p>
<p>${mailConf.MailLinkDomain}/validation/${mail.secret}</p>
        `
    } else if (mail.maildb.action == 'PasswordReset') {
        mailOptions.html = `
<h1>You had made a requset for resetting your password of INFOR-Pad</h1>
</br>
<p>To reset your password. Please click the link below.</p>
<a href="${mailConf.MailLinkDomain}/validation/${mail.secret}">Link</a>
<p>If you hadn't make this request, please ignore this mail, and contact with us.</p>
<p>If the link is unavailabled you can copy the plain text link, and paste it to the browser.</p>
<p>${mailConf.MailLinkDomain}/validation/${mail.secret}</p>
        `
    }
    try {
        await transporter.sendMail(mailOptions)
        await mail.maildb.save()
    } catch (err) {
        throw new ApiError(507, err.message)
    }
    return mail.secret
}

exports.executeAction = async function (secret) {
    let mailvad = await MailValidation.findOne({ secret: hash.hashSessionId(secret) })
    if (mailvad && mailvad.expireAt > new Date()) {
        if (mailvad == 'SignupCheck') {
            await mailvad.populate('user').execPopulate()
            mailvad.user.level = 1
            await mailvad.user.save()
            let ret = {
                type: 'SignupCheck',
                user: mailvad.user
            }
            await mailvad.remove()
            return ret
        } else if (mailvad == 'PasswordReset') {
            let ret = {
                type: 'PasswordReset',
                user: mailvad.user
            }
            return ret
        }
    } else {
        throw new ApiError(410, "Expired token!")
    }
}
