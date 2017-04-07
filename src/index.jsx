import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  //browserHistory,
  IndexRoute
} from 'react-router'

import HomePage from './components/HomePage.jsx'
import IndexPage from './components/IndexPage.jsx'
import Sign_in from './components/Sign_in.jsx'
import Sign_up from './components/Sign_up.jsx'

//<HomePage />
// <IndexPage />
// <HomePage />
// <Sign_in />
// <Sign_up />
const App = () => (
  <div>
    <Router>
      <Route path="/" component={IndexPage}>
        <IndexRoute component={HomePage} />
        <Route path="/Sign_in" component={Sign_in} />
        <Route path="/Sign_up" component={Sign_up} />
      </Route>
    </Router>
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'))
