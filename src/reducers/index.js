import { combineReducers } from 'redux-immutable'
import auth from './data/authReducers.js'

const rootReducer = combineReducers({
  auth
})

export default rootReducer
