import React from 'react'
import { Route, IndexRoute } from 'react-router'
import cookie from 'react-cookie'

import HomePage from '../components/HomePage.jsx'
import PermissionDenied from '../components/PermissionDenied.jsx'
//import IndexPage from '../components/IndexPage.jsx'
import UserPage_Container from '../containers/UserPage_Container'
import Main_Container from '../containers/Main_Container'
import Sign_in_Container from '../containers/Sign_in_Container'
import Sign_up_Container from '../containers/Sign_up_Container'
import CheckAuth from '../components/CheckAuth.jsx'
import MyPad_Container from '../containers/MyPad_Container'
import Folder_Container from '../containers/Folder_Container'
import File_Container from '../containers/File_Container'
import Pad from '../components/pad/Pad.jsx'
import sharePage from '../components/sharePage.jsx'

module.exports = (
  <Route path="/" component={Main_Container}>
    <IndexRoute component={CheckAuth(HomePage, 'guest')} />
    <Route path="Sign_in" component={CheckAuth(Sign_in_Container, 'guest')} />
    <Route path="Sign_up" component={CheckAuth(Sign_up_Container, 'guest')} />
    <Route path="pad" component={Pad}>
      <Route path="mypad" component={CheckAuth(MyPad_Container, 'auth')} />
      <Route path="folder/:folderid" component={Folder_Container} />
      <Route path="file/:fileid" component={File_Container}/>
    </Route>
    <Route path="editor/:fileid" />
    <Route path="user/:user" component={UserPage_Container} />
    <Route path="permission_denied" component={PermissionDenied}/>
    <Route path=":shortid" component={sharePage} />
  </Route>
)
