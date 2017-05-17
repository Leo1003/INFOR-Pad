import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router'
import Logout_Container from '../../containers/Logout_Container.js'
import cookie from 'react-cookie'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Menu secondary inverted style={{background: '#1b1c1d', margin: '0'}}>
          <Menu.Item name="INFOR PAD" as={Link} to='/' />
            {
              this.props.isLogin === false ?
              (
                <Menu.Menu position='right'>
                  <Menu.Item>
                    <Button inverted as={Link} to='/Sign_in'>Sign in</Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button inverted as={Link} to='/Sign_up'>Sign up</Button>
                  </Menu.Item>
                </Menu.Menu>
              ):
              (
                <Menu.Menu position='right'>
                  <Menu.Item>
                    <Button inverted as={Link}>{this.props.name}</Button>
                  </Menu.Item>
                  <Logout_Container />
                </Menu.Menu>
              )
            }
        </Menu>
      </div>
    )
  }
}


export default NavBar
