const mongoose = require('mongoose')
const Schema = mongoose.Schema
const debug = require('debug')('INFOR-Pad:mongodb')

var User = new Schema({
    name : String,
    password : String,
    level : { type : Number, default : 0 },
    createDate : { type : Date, default : new Date() },
    lastLogin : { type : Date, default : new Date() },
    root : { type: Schema.Types.ObjectId, ref: 'Directory' }
})

var Session = new Schema({
    uuid : String,
    expireAt : { type: Date, expires: 1 },
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    autoLogin : { type: Boolean, default : false }
})

var Directory = new Schema({
    name : String,
    parent : { type: Schema.Types.ObjectId, ref: 'Directory' },
    createDate : { type : Date, default : new Date() },
    modifyDate : { type : Date, default : new Date() },
    files : [{ type: Schema.Types.ObjectId, ref: 'File' }]
})

var File = new Schema({
    name : String,
    parent : { type: Schema.Types.ObjectId, ref: 'Directory' },
    createDate : { type : Date, default : new Date() },
    modifyDate : { type : Date, default : new Date() },
    format : String,
    data : String,
    stdin : String
})

mongoose.model('User', User)
mongoose.model('Session', Session)
mongoose.model('Directory', Directory)
mongoose.model('File', File)

mongoose.connect('mongodb://localhost:27017/INFOR-Pad', error => {
    if(error) {
        console.error(`Failed to connect to mongodb.`)
        throw error
    }
    else {
        debug('connected to mongodb.')
    }
})
