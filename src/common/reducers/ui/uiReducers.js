import { handleActions } from 'redux-actions'
import { ui } from '../../constants/models'

const uiReducers = handleActions({
  ISFETCHING: (state) => {
    //console.log("isFetching")
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  DIDFETCH: (state) => {
    //console.log("didFetch")
    return Object.assign({}, state, {
      isFetching: false
    })
  }
}, ui)

export default uiReducers
