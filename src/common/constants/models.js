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
  rootfsid: ''            // user's root directory fsid (Hidden)
}

export const folder = {
  name: '',               //File name
  parent: '',             //Parent Directory
  owner: '',              //The user id of the file's owner
  shortid:'',
  createDate: new Date(), //CreateDate
  modifyDate: new Date(), //LastModifyDate
  isPublic: false,        //If the file can be viewed by anyone
  format: '',             //The file's format or 'Directory'
  files: []               //The list of the files contained (Directory Only)
}

export const file = {
  name: '',               //File name
  parent: '',             //Parent Directory
  owner: '',              //The user id of the file's owner
  shortid: '',
  createDate: new Date(), //CreateDate
  modifyDate: new Date(), //LastModifyDate
  isPublic: false,        //If the file can be viewed by anyone
  format: '',             //The file's format or 'Directory'
  code: '',               //The code of the file (File Only)
  stdin: '',              //The stdin data (File Only)
}

export const ui = {
  isFetching: false,
  name: '',
  shortid: '',
  lang: 'ar'
}
