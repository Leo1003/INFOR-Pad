const crypto = require('crypto')

exports.hashSessionId = function(sessid) {
    return crypto.createHash('sha512').update(sessid).digest('hex')
}

exports.hashPassword = function(password, salt) {
    return crypto.createHmac('RSA-SHA512', salt).update(password).digest('hex')
}
