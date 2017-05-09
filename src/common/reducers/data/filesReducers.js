import { handleActions } from 'redux-actions'
import { file, folder } from '../../constants/models'
import { browserHistory } from 'react-router'

export const folderReducers = handleActions({
  GET_FOLDER: (state, { payload }) => {
    return Object.assign({}, state, payload.data)
  },
  ADD_NEW_FOLDER: (state) => {
    return folder
  },
  CLEAN_FOLDER: (state) => {
    return folder
  },
  GET_SHORTID: (state, { payload }) => {
    return Object.assign({}, state, {
      files: state.files.map(file => {
        if(file.id === payload.data.id) return Object.assign({}, file, { shortid: payload.data.shortid, isPublic: payload.data.isPublic })
        else return file
      })
    })
  },
  TRANSFER_SHORTID: (state, { payload }) => {
    if(payload.data.format === 'Directory') browserHistory.replace(`/pad/folder/${payload.data.id}`)
    else browserHistory.replace(`/file/${payload.data.id}/view`)
    return state
  }
}, folder)

export const fileReducers = handleActions({
  GET_FILE: (state, { payload }) => {
    return Object.assign({}, state, payload.data)
  },
  CLEAN_FILE: (state) => (file)
}, file)
