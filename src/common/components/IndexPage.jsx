import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router'
import Logout_Container from '../containers/Logout_Container.js'
import cookie from 'react-cookie'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("Index")
    console.log(this.props)
    let rightMenu = () => {
      if(this.props.isLogin) return (
        <Menu.Menu position='right'>
          <Menu.Item name={this.props.name} as={Link} />
          <Logout_Container />
        </Menu.Menu>
      )
      else return (
        <Menu.Menu position='right'>
          <Menu.Item name="Sign in" as={Link} to='/Sign_in' />
          <Menu.Item name="Sign up" as={Link} to='/Sign_up' />
        </Menu.Menu>
      )
    }
    return (
      <div>
        <Menu secondary inverted style={{background: 'black', margin: '0'}}>
          <Menu.Item name="INFOR PAD" as={Link} to='/' />
            {rightMenu()}
        </Menu>
        {this.props.children}
      </div>
    )
  }
}


export default IndexPage
