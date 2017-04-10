import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  IndexRoute,
  Link
} from 'react-router-dom'

import HomePage from './components/HomePage.jsx'
import IndexPage from './components/IndexPage.jsx'
import Sign_in from './components/Sign_in.jsx'
import Sign_up from './components/Sign_up.jsx'

const App = () => (
  <Router>
    <div>
        <Route path="/" component={IndexPage}/>
        <Route exact path="/" component={HomePage}/>
        <Route path="/Sign_in" component={Sign_in}/>
        <Route path="/Sign_up" component={Sign_up}/>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('app'))
