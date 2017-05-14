import { handleActions } from 'redux-actions'
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
      error_message: '',
      isLogin: true,
      sessionid: payload.data.sessionid,
    })
  },
  SIGN_IN_FAIL: (state) => {
    return Object.assign({}, state, { error_message: 'Sign in Fail' })
  },
  SIGN_UP_SUCCESS: (state, { payload }) => {
    return Object.assign({}, state)
  },
  SIGN_UP_FAIL: (state, { payload }) => {
    return Object.assign({}, state, { error_message: `${payload.data.error}`})
  },
  CLEAN_SESSION: (state) => {
    cookie.remove('sessionid', { path: '/' })
    return session
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
    else return session
  },
  LOGIN_FIRST: (state) => {
    browserHistory.replace({ pathname: '/Sign_in'})
    return Object.assign({}, state, {
      error_message: 'Login first!'
    })
  },
}, session)

export default sessionReducers
