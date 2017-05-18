import React from 'react'
import { connect } from 'react-redux'
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
          <Menu.Item as={Link} to='/'>
            <h2>INFOR PAD</h2>
          </Menu.Item>
            {
              this.props.isLogin === false ?
              (
                <Menu.Menu position='right'>
                  <Menu.Item>
                    <Button inverted as={Link} to='/Sign_in'>{this.props.lang == 'en' ? 'Sign In' : 'تسجيل الدخول'}</Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button inverted as={Link} to='/Sign_up'>{this.props.lang == 'en' ? 'Sign Up' : 'سجل'}</Button>
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


export default connect(
  (state, dispatch) => {
    lang: state.ui.lang
  }
)(NavBar)
