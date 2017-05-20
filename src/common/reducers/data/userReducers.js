import { handleActions } from 'redux-actions'
import { user } from '../../constants/models.js'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'
const userReducers = handleActions({
  CLEAN_USER: (state) => {
    return user
  },
  GET_INITIAL_USER: (state, { payload }) => {
    return Object.assign({}, state, payload.data.user)
  },
}, user)

export default userReducers
