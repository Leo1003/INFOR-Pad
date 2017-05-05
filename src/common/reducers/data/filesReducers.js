import { handleActions } from 'redux-actions'
import { file, folder } from '../../constants/models'

export const folderReducers = handleActions({
  GET_FOLDER: (state, { payload }) => {
    return Object.assign({}, state, payload.data)
  },
  ADD_NEW_FOLDER: (state) => {
    return folder
  },
  CLEAN_FOLDER: (state) => (folder),
}, folder)

export const fileReducers = handleActions({
  GET_FILE: (state, { payload }) => {
    return file
  },
  CLEAN_FILE: (state) => (file)
}, file)
