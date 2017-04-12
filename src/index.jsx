import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  browserHistory
} from 'react-router'

import routes from './routes/routes.jsx'

const App = () => (
  <Router history={browserHistory} routes={routes} />
)

ReactDOM.render(<App />, document.getElementById('app'))
