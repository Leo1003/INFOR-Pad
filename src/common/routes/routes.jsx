import React from 'react'
import { Route, IndexRoute } from 'react-router'
import cookie from 'react-cookie'

import HomePage from '../components/HomePage.jsx'
//import IndexPage from '../components/IndexPage.jsx'
import UserPage_Container from '../containers/UserPage_Container'
import Main_Container from '../containers/Main_Container'
import Sign_in_Container from '../containers/Sign_in_Container'
import Sign_up_Container from '../containers/Sign_up_Container'
import CheckAuth_Container from '../containers/CheckAuth_Container'

const checkAuth = (nextState, replace, callback) => {
  console.log("checkAuth")
  console.log(nextState)
  if(cookie.load('sessionid')) {
    replace('/')
  }
  callback()
}

module.exports = (
  <Route path="/" component={Main_Container}>
    <IndexRoute component={HomePage} />
    <Route path="/Sign_in" component={Sign_in_Container} />
    <Route path="/Sign_up" component={Sign_up_Container} />
    <Route path="/:user" component={UserPage_Container} />
  </Route>
);
