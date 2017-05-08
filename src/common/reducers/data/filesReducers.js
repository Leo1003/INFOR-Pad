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
  GET_SHORTID: (state, { payload}) => {
    return folder
    // return Object.assign({}, state, {
    //   files: [
    //     ...state.files,
    //     {
    //       "id": "12345",
    //       "shortid": "HELLOWORLD"
    //     }
    //   ]
    // })
  }
}, folder)

export const fileReducers = handleActions({
  GET_FILE: (state, { payload }) => {
    return Object.assign({}, state, payload.data)
  },
  CLEAN_FILE: (state) => (file)
}, file)
