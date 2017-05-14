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
    if(!sessionid) return
    else this.props.handleLogout(sessionid)
  }
  render() {
    return (
      <div>
        <Menu.Item name={this.props.lang == 'en' ? 'Logout' : 'الخروج'} as={Link} onClick={this.onLogout} />
      </div>
    )
  }
}

export default Logout
