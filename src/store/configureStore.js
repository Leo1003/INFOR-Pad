import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'
import Immutable from 'immutable'

const initialState = Immutable.Map()

export default function configureStore(preloadedState = initialState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      reduxThunk,
      createLogger()
    )
  )
  return store
}
