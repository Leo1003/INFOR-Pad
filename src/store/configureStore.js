import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'

export default createStore(
  rootReducer,
  applyMiddleware(
    reduxThunk,
    createLogger()
  )
)
