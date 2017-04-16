import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router'
import Logout from './Logout.jsx'

const IndexPage = (props) => (
  <div>
    <Menu secondary inverted style={{background: 'black', margin: '0'}}>
      <Menu.Item name="INFOR PAD" as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item name="Sign in" as={Link} to='/Sign_in' />
        <Menu.Item name="Sign up" as={Link} to='/Sign_up' />
        <Logout />
      </Menu.Menu>
    </Menu>
    {props.children}
  </div>
)


export default IndexPage
