import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  browserHistory
} from 'react-router'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'

import routes from '../common/routes/routes.jsx'
import configureStore from '../common/store/configureStore'
import { GetInitialSession } from '../common/actions/sessionActions'
import { fetchGetInitialUser } from '../common/actions/userActions'

const initialState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

const store = configureStore(initialState)

store.dispatch(GetInitialSession())
if(store.getState().session.sessionid) store.dispatch(fetchGetInitialUser(store.getState().session.sessionid))

const App = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
)

ReactDOM.render(<App store={store} />, document.getElementById('app'))
