import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router'
import Logout from './Logout.jsx'
import cookie from 'react-cookie'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    // const sesionid = cookie.load('sessionid')
    // if(sessionid && this.props.sessionid.length == 0) {
    //   this.props.getInitial(sessionid)
    // }
  }
  render() {
    console.log("Index")
    console.log(this.props)
    let rightMenu = () => {
      if(this.props.isLogin) return (
        <Menu.Menu position='right'>
          <Menu.Item name="username" as={Link} />
          <Logout />
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
