import { handleActions } from 'redux-actions'
import { file, folder } from '../../constants/models'

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
    console.log("GET_SHORTID reducer")
    return Object.assign({}, state, {
      files: state.files.map(file => {
        if(file.id === payload.data.id) return Object.assign({}, file, { shortid: payload.data.shortid, isPublic: payload.data.isPublic })
        else return file
      })
    })
  }
}, folder)

export const fileReducers = handleActions({
  GET_FILE: (state, { payload }) => {
    return Object.assign({}, state, payload.data)
  },
  CLEAN_FILE: (state) => (file)
}, file)
