import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  browserHistory
} from 'react-router'
import { Provider } from 'react-redux'
//import { syncHistoryWithStore } from 'react-router-redux'

import store from './store/configureStore.js'
import routes from './routes/routes.jsx'

//const history = syncHistoryWithStore(browserHistory, store)

const App = ({store}) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
)

ReactDOM.render(<App store={store} />, document.getElementById('app'))
