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
    if(!sessionid) return
    fetch("/api/session", {
      method: 'DELETE',
      headers: {
        'sessionid': `${sessionid}`
      }
    })
    .then(res => {
      if(res.ok) {
        cookie.remove('sessionid')
        browserHistory.replace({ pathname: '/' })
      } else if(res.status == 401) {
        if(sessionid) cookie.remove('sessionid')
        browserHistory.push('/')
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
