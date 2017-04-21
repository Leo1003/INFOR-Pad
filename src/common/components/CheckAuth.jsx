import React from 'react'
import { browserHistory } from 'react-router'
import cookie from 'react-cookie'

class CheckAuth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }
  componentDidMount() {
    if(cookie.load('sessionid')) {
      //console.log(cookie.load('sessionid'))
      this.setState({'isLogin': true})
      browserHistory.replace({
        pathname: "/"
      })
    }
  }
  render() {
    if(!this.state.isLogin) {
      return this.props.children
    }
    else return
  }
}
export default CheckAuth
