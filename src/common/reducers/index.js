import { combineReducers } from 'redux'
import auth from './data/authReducers.js'

const rootReducer = combineReducers({
  auth
})

export default rootReducer
