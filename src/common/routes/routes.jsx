import React from 'react'
import { Route, IndexRoute } from 'react-router'
import cookie from 'react-cookie'

import HomePage from '../components/HomePage.jsx'
//import IndexPage from '../components/IndexPage.jsx'
import UserPage_Container from '../containers/UserPage_Container'
import Main_Container from '../containers/Main_Container'
import Sign_in_Container from '../containers/Sign_in_Container'
import Sign_up_Container from '../containers/Sign_up_Container'
import CheckAuth from '../components/CheckAuth.jsx'
import MyPad from '../components/MyPad.jsx'

module.exports = (
  <Route path="/" component={Main_Container}>
    <IndexRoute component={CheckAuth(HomePage, 'guest')} />
    <Route path="Sign_in" component={CheckAuth(Sign_in_Container, 'guest')} />
    <Route path="Sign_up" component={CheckAuth(Sign_up_Container, 'guest')} />
    <Route path="mypad" component={CheckAuth(MyPad, 'auth')} />
    <Route path="user/:user" component={UserPage_Container} />
    <Route path="file/:fileid" />
    <Route path="folder/:folderid" />
    <Route path=":shareid" />
  </Route>
);
