import { handleActions } from 'redux-actions'
import { editor } from '../../constants/models'

export const editorReducers = handleActions({
    SAVING: (state) => {
        return Object.assign({}, state, {
            saving: true
        })
    },
    DIDSAVE: (state) => {
        return Object.assign({}, state, {
            saving: false
        })
    },
    EDITOR_GET_FILE: (state, { payload }) => {
        return Object.assign({}, state, {
            openedFiles: [
                ...state.openedFiles,
                payload.data
            ]
        })
    },
    CHANGE_CODE: (state, { code, fsid }) => {
        return Object.assign({}, state, {
            openedFiles: state.openedFiles.map(file => {
                if(file.id !== fsid) return file
                else return Object.assign({}, file, {
                    code: code
                })
            })
        })
    },
    EDITOR_FILE_MODIFY: (state, { fsid, modifyType, modifyValue }) => {
        let tmp = {}
        tmp[modifyType] = modifyValue
        return Object.assign({}, state, {
            openedFiles: state.openedFiles.map(file => {
                if(file.id !== fsid) return file
                else return Object.assign({}, file, tmp)
            })
        })
    }
}, editor)