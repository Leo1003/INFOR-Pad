import { combineReducers } from 'redux'
import session from './data/sessionReducers.js'
import user from './data/userReducers.js'

const rootReducer = combineReducers({
  session, user
})

export default rootReducer
