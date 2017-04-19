import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  browserHistory
} from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes/routes.jsx'

import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './reducers'

import { fromJS } from 'immutable'

const preloadedState = window.__PRELOADED_STATE__
console.log(preloadedState)

delete window.__PRELOADED_STATE__

const store = createStore(
  rootReducer,
  fromJS(preloadedState),
  applyMiddleware(reduxThunk, createLogger())
)

const App = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
)

ReactDOM.render(<App store={store} />, document.getElementById('app'))
