import { handleActions } from 'redux-actions'
import { file, folder } from '../../constants/models'

export const folderReducers = handleActions({
  GET_FOLDER: (state, { payload }) => {
    console.log(payload)
    return Object.assign({}, state, payload.data)
  }
}, folder)

export const fileReducers = handleActions({
  GET_FILE: (state, { payload }) => {
    // console.log(payload)
    return file
  }
}, file)
