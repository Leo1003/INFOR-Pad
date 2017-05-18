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
    }
}, editor)