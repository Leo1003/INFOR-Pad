export const session = {
    error_message: '',   //login or sign in error
    isLogin: false,
    sessionid: '',
}

export const user = {
  name: '',               // username,
  level: 0,               // userlevel,
  id: '',                 // userid
  createDate: new Date(), // The time when the user created
  email: '',              // The user's email (Hidden)
  lastLogin: new Date(),  // The last time when the user login (Hidden)
  rootfsid: '',            // user's root directory fsid (Hidden)
  settings: {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    fontSize: 12,
    highlightActiveLine: true,
    keyboardHandler: "Default",
    showGutter: true,
    tabSize: 4,
    theme: "monokai",
    wrapEnabled: false
  }
}

export const folder = {
  name: '',               //File name
  description:'',
  parent: {
    id: '',
    name: '',
    owner: '',
    createDate: new Date(),
    modifyDate: new Date(),
    isPublic: false,
    shortid: '',
    format: ''
  },             //Parent Directory
  owner: {
    id: '',
    name: '',
    leve: 0,
    createDate: new Date()
  },              //The user id of the file's owner
  id: '',
  shortid:'',
  createDate: new Date(), //CreateDate
  modifyDate: new Date(), //LastModifyDate
  isPublic: false,        //If the file can be viewed by anyone
  format: '',             //The file's format or 'Directory'
  files: [],              //The list of the files contained (Directory Only)
}

export const file = {
  name: '',               //File name
  description: '',
  parent: {
    id: '',
    name: '',
    owner: '',
    createDate: new Date(),
    modifyDate: new Date(),
    isPublic: false,
    shortid: '',
    format: '',
  },             //Parent Directory
  owner: {
    id: '',
    name: '',
    leve: 0,
    createDate: new Date()
  },              //The user id of the file's owner
  id: '',
  shortid: '',
  createDate: new Date(), //CreateDate
  modifyDate: new Date(), //LastModifyDate
  isPublic: false,        //If the file can be viewed by anyone
  format: '',             //The file's format or 'Directory'
  code: '',               //The code of the file (File Only)
  stdin: '',              //The stdin data (File Only)
  size: 0
}

export const ui = {
  isFetching: false,
  name: '',
  shortid: '',
  error: '',
  redirectToError: false,
  moveContent: {
    name: '',
    id: '',
    parentId: '',
    files: []
  },
  openedModal: {
    createDate: '',
    format: "",
    id: "",
    isPublic: false,
    modifyDate: "",
    name: "",
    owner: "",
    parent:"",
    description: '',
  }
}

export const editor = {
  openedFiles: [],
  saving: false
}