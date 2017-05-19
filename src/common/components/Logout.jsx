import React from 'react'
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
      <div className="item" style={{ margin: '0'}}>
        <Link><div className="ui button inverted" style={{ margin: '0'}} onClick={this.onLogout}>Logout</div></Link>
      </div>
    )
  }
}

export default Logout
