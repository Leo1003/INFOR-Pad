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
    let d = new Date()
    d.setTime(d.getTime() + (14 * 24 * 60 * 60 * 1000))
    cookie.save('sessionid', payload.data.sessionid, { path: '/' , expires: d})
    browserHistory.replace({ pathname: '/' })
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
  },
  LOGOUT: (state) => {
    cookie.remove('sessionid')
    browserHistory.replace({ pathname: '/' })
    return Object.assign({}, state, {
      isLogin: false,
      sessionid: '',
      error_message: ''
    })
  },
  GET_INITIAL_SESSION: (state) => {
    const sessionid = cookie.load('sessionid')
    if(sessionid) {
      return Object.assign({}, state, {
        isLogin: true,
        sessionid: `${sessionid}`,
        error_message: ''
      })
    }
    else return Object.assign({}, state, {
      isLogin: false,
      sessionid: '',
      error_message: ''
    })
  }
}, session)

export default sessionReducers
