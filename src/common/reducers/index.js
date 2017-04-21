import { combineReducers } from 'redux'
import session from './data/sessionReducers.js'

const rootReducer = combineReducers({
  session
})

export default rootReducer
