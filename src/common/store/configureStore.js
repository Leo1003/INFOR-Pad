import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { session, user, file, folder, ui, editor } from '../constants/models'
import rootReducer from '../reducers'
import Immutable, { fromJS } from 'immutable'

const initialState = {
  session,
  user,
  file,
  folder,
  ui,
  editor
}

export default function configureStore(preloadedState = initialState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      reduxThunk,
      // createLogger()
    )
  )
  return store
}
