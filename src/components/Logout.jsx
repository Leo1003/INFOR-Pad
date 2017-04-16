import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, browserHistory } from 'react-router'
import cookie from 'react-cookie'

class Logout extends React.Component{
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout(e) {
    const sessionid = cookie.load('sessionid')
    console.log(sessionid)
    fetch("/api/session", {
      method: 'DELETE',
      headers: {
        'sessionid': `${sessionid}`
      }
    })
    .then(res => {
      if(res.ok) {
        console.log("Logout")
        cookie.remove('sessionid')
        browserHistory.replace({ pathname: '/' })
      }
    })
  }
  render() {
    return (
      <Menu.Item name="Logout" as={Link} onClick={this.handleLogout} />
    )
  }
}

export default Logout
