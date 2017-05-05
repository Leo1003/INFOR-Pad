import { handleActions } from 'redux-actions'
import { ui } from '../../constants/models'

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
}, ui)

export default uiReducers
