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
        <Menu secondary inverted style={{background: '#24292e', margin: '0'}}>
          <div className="item" style={{ margin: '0'}}>
            <Link to='/'><h3>INFOR PAD</h3></Link>
          </div>
            {
              this.props.isLogin === false ?
              (
                <Menu.Menu position='right'>
                  <div className="item" style={{ margin: '0'}}>
                    <Link to='/Sign_in'><div className="ui button inverted" style={{ margin: '0'}}>Sign in</div></Link>
                  </div>
                  <div className="item" style={{ margin: '0'}}>
                    <Link to='/Sign_up'><div className="ui button inverted" style={{ margin: '0'}}>Sign up</div></Link>
                  </div>
                </Menu.Menu>
              ):
              (
                <Menu.Menu position='right'>
                  <div className="item" style={{ margin: '0'}}>
                    <Link><div className="ui button inverted" style={{ margin: '0'}}>{this.props.name}</div></Link>
                  </div>
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
