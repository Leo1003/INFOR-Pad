import { handleActions } from 'redux-actions'
import {
  GET_INITIAL_USER
} from '../../constants/actionTypes'
import { user } from '../../constants/models.js'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'
const userReducers = handleActions({
  GET_INITIAL_USER: (state, { payload }) => {
    console.log("userReducer")
    console.log(state)
    return Object.assign({}, state, {
      name: payload.data.user.name,
      level: payload.data.user.level,
      createDate: payload.data.user.createDate,
      email: payload.data.user.email,
      lastLogin: payload.data.user.lastLogin,
      rootfsid: payload.data.user.rootfsid
    })
  }
}, user)

export default userReducers
