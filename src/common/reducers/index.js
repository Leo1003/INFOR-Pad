import { combineReducers } from 'redux'
import session from './data/sessionReducers.js'
import user from './data/userReducers.js'
import { editorReducers } from './data/editorReducers'
import { fileReducers, folderReducers } from './data/filesReducers'
import ui from './ui/uiReducers'

const rootReducer = combineReducers({
  session, user, file: fileReducers, folder: folderReducers, ui, editor: editorReducers
})

export default rootReducer
