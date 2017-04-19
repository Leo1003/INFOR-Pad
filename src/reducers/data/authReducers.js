import { handleActions } from 'redux-actions'
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL
} from '../../constants/actionTypes'
import { auth_state } from '../../constants/models.js'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

const authReducers = handleActions({
  SIGN_IN_SUCCESS: (state, { payload }) => {
    console.log('reducers')
    cookie.save('sessionid', payload.data.sessionid, { path: '/' })
    browserHistory.push('/')
    //return Object.assign({}, { message: '' })
    return state.set('message', '')
  },
  SIGN_IN_FAIL: (state) => {
    //return Object.assign({}, { message: 'Sign in Fail' })
    return state.set('message', 'Sign in Fail')
  },
  SIGN_UP_SUCCESS: (state) => {
    browserHistory.push('/')
    //return Object.assign({}, { message: '' })
    return state.set('message', '')
  },
  SIGN_UP_FAIL: (state) => {
    //return Object.assign({}, { message: 'Username Already Used'})
    return state.set('message', 'Username Already Used')
  }
}, auth_state)

export default authReducers
