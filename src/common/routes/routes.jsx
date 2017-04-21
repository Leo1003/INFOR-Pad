import React from 'react'
import { Route, IndexRoute } from 'react-router'
import cookie from 'react-cookie'

import HomePage from '../components/HomePage.jsx'
//import IndexPage from '../components/IndexPage.jsx'
import IndexPageContainer from '../containers/IndexPageContainer'
import Sign_in_Container from '../containers/Sign_in_Container'
import Sign_up_Container from '../containers/Sign_up_Container'
import CheckAuth from '../components/CheckAuth.jsx'

module.exports = (
  <Route path="/" component={IndexPageContainer}>
    <IndexRoute component={HomePage} />
    <Route component={CheckAuth}>
      <Route path="/Sign_in" component={Sign_in_Container} />
      <Route path="/Sign_up" component={Sign_up_Container} />
    </Route>
  </Route>
);
