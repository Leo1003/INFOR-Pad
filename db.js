const mongoose = require('mongoose')
const Schema = mongoose.Schema
const debug = require('debug')('INFOR-Pad:mongodb')

var UserSettings = new Schema({
    theme: { type: String, default: 'monokai' },
    fontSize: { type: Number, default: 12 },
    showGutter: { type: Boolean, default: true },
    highlightActiveLine: { type: Boolean, default: true },
    wrapEnabled: { type: Boolean, default: false },
    enableBasicAutocompletion: { type: Boolean, default: true },
    enableLiveAutocompletion: { type: Boolean, default: true },
    tabSize: { type: Number, default: 4 },
    keyboardHandler: { type: String, default: 'Default' }
})

var User = new Schema({
    name: { type: String, index: true, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, index: true, required: true },
    level: { type: Number, default: 0 },
    createDate: { type: Date, default: new Date() },
    lastLogin: { type: Date, default: new Date() },
    root: { type: Schema.Types.ObjectId, ref: 'FileSystem' },
    settings: { type: UserSettings, default: UserSettings }
})

var Session = new Schema({
    uuid: { type: String, index: true, unique: true },
    expireAt: { type: Date, expires: 1 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    autoLogin: { type: Boolean, default: false }
})

var FileSystem = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    parent: { type: Schema.Types.ObjectId, ref: 'FileSystem' },
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
    createDate: { type: Date, default: new Date() },
    modifyDate: { type: Date, default: new Date() },
    isFile: { type: Boolean, required: true },
    isPublic: { type: Boolean, default: false },
    shortid: { type: String, unique: true, sparse: true },
    editSecret: { type: String },
    files: {
        type: [{ type: Schema.Types.ObjectId, ref: 'FileSystem' }],
        default: undefined
    },
    format: String,
    code: { type: String },
    stdin: { type: String }
})

var MailValidation = new Schema({
    secret: { type: String, required: true, index: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, enum: ['SignupCheck', 'PasswordReset'], required: true },
    sentAt: { type: Date, default: new Date() },
    expireAt: { type: Date, expires: 1, required: true }
})

mongoose.model('User', User)
mongoose.model('Session', Session)
mongoose.model('FileSystem', FileSystem)
mongoose.model('MailValidation', MailValidation)

mongoose.connect('mongodb://localhost:27017/INFOR-Pad', error => {
    if (error) {
        console.error(`Failed to connect to mongodb.`)
        throw error
    } else {
        debug('connected to mongodb.')
    }
})