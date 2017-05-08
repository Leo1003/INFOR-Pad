import { handleActions } from 'redux-actions'
import { ui } from '../../constants/models'

const uiReducers = handleActions({
  ISFETCHING: (state) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  DIDFETCH: (state) => {
    return Object.assign({}, state, {
      isFetching: false
    })
  },
  GET_USER_BY_ID: (state, { payload }) => {
    return Object.assign({}, state, {
      name: payload.data.name
    })
  }
}, ui)

export default uiReducers
