import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, browserHistory } from 'react-router'
import cookie from 'react-cookie'

class Logout extends React.Component{
  constructor(props) {
    super(props)
    //this.handleLogout = this.handleLogout.bind(this)
  }
  // handleLogout(e) {
  //   const sessionid = cookie.load('sessionid')
  //   if(!sessionid) return
  //   else this.props.onLogout
  // }
  render() {
    return (
      <Menu.Item name="Logout" as={Link} onClick={this.props.handleLogout} />
    )
  }
}

export default Logout
