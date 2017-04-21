const mongoose = require('mongoose')
const Schema = mongoose.Schema
const debug = require('debug')('INFOR-Pad:mongodb')

var User = new Schema({
    name : String,
    password : String,
    salt : String,
    email : String,
    level : { type : Number, default : 0 },
    createDate : { type : Date, default : new Date() },
    lastLogin : { type : Date, default : new Date() },
    root : { type: Schema.Types.ObjectId, ref: 'FileSystem' }
})

var Session = new Schema({
    uuid : { type: String, unique: true },
    expireAt : { type: Date, expires: 1 },
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    autoLogin : { type: Boolean, default : false }
})

var FileSystem = new Schema({
    name : { type: String, required: true },
    parent : { type: Schema.Types.ObjectId, ref: 'FileSystem' },
    owner : { type: Schema.Types.ObjectId, ref: 'User' },
    createDate : { type : Date, default : new Date() },
    modifyDate : { type : Date, default : new Date() },
    isFile : { type: Boolean, required: true },
    isPublic : { type: Boolean, default: false },
    files : [{ type: Schema.Types.ObjectId, ref: 'FileSystem' }],
    format : String,
    code : { type: String },
    stdin : { type: String }
})

mongoose.model('User', User)
mongoose.model('Session', Session)
mongoose.model('FileSystem', FileSystem)

mongoose.connect('mongodb://localhost:27017/INFOR-Pad', error => {
    if(error) {
        console.error(`Failed to connect to mongodb.`)
        throw error
    }
    else {
        debug('connected to mongodb.')
    }
})
