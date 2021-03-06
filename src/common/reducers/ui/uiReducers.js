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
  INITIALREDIRECT: (state) => {
    return Object.assign({}, state, {
      redirectToError: false
    })
  },
  CHANGE_MOVE_CONTENT: (state, { payload }) => {
    return Object.assign({}, state, {
      moveContent: {
        name: payload.data.name,
        id: payload.data.id,
        files: payload.data.files,
        parentId: payload.data.parent.id
      }
    })
  },
  CHANGE_FOLDER_MODAL: (state, { file }) => (
    Object.assign({}, state, {
      openedModal: file
    })
  ), 
  PERMISSION_DENIED: (state) => {
    return Object.assign({}, state, {
      error: 'Permission Denied!',
      redirectToError: true
    })
  },
  FILE_IS_NOT_EXIST: (state) => {
    return Object.assign({}, state, {
      error: 'File is not exist!',
      redirectToError: true
    })
  },
  DATA_IS_TOO_BIG: (state) => {
    return Object.assign({}, state, {
      error: 'Your Data is Too Big',
      redirectToError: true
    })
  },
  REDIRECT_ERROR: (state, { error }) => {
    return Object.assign({}, state, {
      error: error,
      redirectToError: true
    })
  }
}, ui)

export default uiReducers
