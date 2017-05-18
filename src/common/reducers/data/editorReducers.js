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
    }
}, editor)