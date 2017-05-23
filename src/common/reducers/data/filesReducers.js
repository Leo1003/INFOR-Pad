import { handleActions } from 'redux-actions'
import { file, folder } from '../../constants/models'
import { browserHistory } from 'react-router'

export const folderReducers = handleActions({
  GET_FOLDER: (state, { payload }) => {
    return Object.assign({}, state, payload.data)
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
  MODIFY_FILE: (state, { fsid, newType, newVal }) => {
    let tmp = {}
    if(newType === 'filename') tmp['name'] = newVal
    else tmp[newType] = newVal
    return Object.assign({}, state, {
      files: state.files.map(file => {
        if(file.id === fsid) return Object.assign({}, file, tmp)
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
