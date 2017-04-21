import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'
import Immutable, { fromJS } from 'immutable'

const initialState = {
  auth: {
    message: '',
  }
}

export default function configureStore(preloadedState = initialState) {
  console.log("store")
  console.log(preloadedState)
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      createLogger(),
      reduxThunk
    )
  )
  return store
}
