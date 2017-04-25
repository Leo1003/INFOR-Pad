import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router'
import Logout_Container from '../containers/Logout_Container.js'
import cookie from 'react-cookie'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <Menu secondary inverted style={{background: 'black', margin: '0'}}>
          <Menu.Item name="INFOR PAD" as={Link} to='/' />
            {
              this.props.isLogin === false ?
              (
                <Menu.Menu position='right'>
                  <Menu.Item name="Sign in" as={Link} to='/Sign_in' />
                  <Menu.Item name="Sign up" as={Link} to='/Sign_up' />
                </Menu.Menu>
              ):
              (
                <Menu.Menu position='right'>
                  <Menu.Item name={this.props.name} as={Link} />
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
