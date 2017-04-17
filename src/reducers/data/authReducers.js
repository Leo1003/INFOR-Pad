import { handleActions } from 'redux-actions'
import {
  SIGN_IN,
  SIGN_UP,
  LOGOUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL
} from '../../constants/actionTypes'
import { auth_state } from '../../constants/models.js'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

const authReducers = handleActions({
  SIGN_IN_SUCCESS: (state, { payload }) => {
    // console.log("I'm in reducers")
    // console.log(payload)
    cookie.save('sessionid', payload.sessionid, { path: '/' })
    browserHistory.push('/')
    return Object.assign({}, { message: '' })
  },
  SIGN_IN_FAIL: (state) => {
    //state.set('message', 'Sign in Fail')
    return Object.assign({}, { message: 'Sign in Fail' })
  }
}, auth_state)

export default authReducers
