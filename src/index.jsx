import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  browserHistory
} from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes/routes.jsx'
import { createLogger } from 'redux-logger'
import configureStore from './store/configureStore'
import { fromJS } from 'immutable'

const initialState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

const store = configureStore(fromJS(initialState))

const App = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
)

ReactDOM.render(<App store={store} />, document.getElementById('app'))
