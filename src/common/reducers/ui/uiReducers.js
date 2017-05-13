import { handleActions } from 'redux-actions'
import { ui } from '../../constants/models'

import { browserHistory } from 'react-router'

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
  },
  PERMISSION_DENIED: (state) => {
    browserHistory.replace({ pathname: '/error' })
    return Object.assign({}, state, {
      error: 'Permission Denied!'
    })
  },
  FILE_IS_NOT_EXIST: (state) => {
    browserHistory.replace({ pathname: '/error' })
    return Object.assign({}, state, {
      error: 'File is not exist!'
    })
  }

}, ui)

export default uiReducers
