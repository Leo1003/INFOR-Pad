import { handleActions } from 'redux-actions'
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL
} from '../../constants/actionTypes'
import { session } from '../../constants/models.js'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

const sessionReducers = handleActions({
  SIGN_IN_SUCCESS: (state, { payload }) => {
    cookie.save('sessionid', payload.data.sessionid, { path: '/' })
    browserHistory.push('/')
    return Object.assign({}, state, {
      isLogin: true,
      sessionid: payload.data.sessionid,
    })
  },
  SIGN_IN_FAIL: (state) => {
    return Object.assign({}, state, { error_message: 'Sign in Fail' })
  },
  SIGN_UP_SUCCESS: (state) => {
    browserHistory.push('/')
    return Object.assign({}, state)
  },
  SIGN_UP_FAIL: (state) => {
    return Object.assign({}, state, { error_message: 'Username Already Used'})
  }
}, session)

export default sessionReducers
