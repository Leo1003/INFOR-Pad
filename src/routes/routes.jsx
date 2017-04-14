import React from 'react'
import { Route, IndexRoute } from 'react-router'
import cookie from 'react-cookie'

import HomePage from '../components/HomePage.jsx'
import IndexPage from '../components/IndexPage.jsx'
import Sign_in from '../components/Sign_in.jsx'
import Sign_up from '../components/Sign_up.jsx'
import CheckAuth from '../components/CheckAuth.jsx'



module.exports = (
  <Route path="/" component={IndexPage}>
    <IndexRoute component={HomePage} />
    <Route component={CheckAuth}>
      <Route path="/Sign_in" component={Sign_in} />
      <Route path="/Sign_up" component={Sign_up} />
    </Route>
  </Route>
);
