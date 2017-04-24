import React from 'react'
class CheckAuth extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    if(!this.props.isLogin) {
      return this.props.children
    }
    else return
  }
}
export default CheckAuth
