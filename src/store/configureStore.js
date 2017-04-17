import { createStore, applyMiddleware } from 'redux'
import Immutable from 'immutable'
import reduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'

//import { routerReducer } from 'react-router-redux'

//const initialState = Immutable.Map()

export default createStore(
  rootReducer,
  applyMiddleware(
    reduxThunk,
    createLogger()
  )
)
