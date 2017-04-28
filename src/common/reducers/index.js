import { combineReducers } from 'redux'
import session from './data/sessionReducers.js'
import user from './data/userReducers.js'
import { fileReducers, folderReducers } from './data/filesReducers'
import ui from './ui/uiReducers'

const rootReducer = combineReducers({
  session, user, file: fileReducers, folder: folderReducers, ui
})

export default rootReducer
