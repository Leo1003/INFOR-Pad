import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, browserHistory } from 'react-router'
import cookie from 'react-cookie'

class Logout extends React.Component{
  constructor(props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
  }
  onLogout(e) {
    const sessionid = cookie.load('sessionid')
    console.log(this.props)
    if(!sessionid) return
    else this.props.handleLogout(sessionid)
  }
  render() {
    return (
      <Menu.Item name="Logout" as={Link} onClick={this.onLogout} />
    )
  }
}

export default Logout
