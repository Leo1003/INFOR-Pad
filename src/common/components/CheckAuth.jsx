import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

export default function CheckAuth(Component, type) {
  class CheckAuthComponent extends React.Component {
    componentWillMount() {
      this.checkAuth()
    }
    componentWillReceiveProps() {
      this.checkAuth()
    }
    checkAuth() {
      if(type === 'auth') {
        if(!this.props.isLogin) {
          this.props.router.push('/')
        }
      } else {
        if(this.props.isLogin) {
          this.props.router.push('/pad/mypad')
        }
      }
    }
    render() {
      return (
        <div>
          {
            (type === 'auth') ?
            this.props.isLogin === true ? <Component {...this.props } /> : null
            : this.props.isLogin === false ? <Component {...this.props } /> : null
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    isLogin: state.session.isLogin,
    name: state.user.name
  })
  return connect(mapStateToProps)(withRouter(CheckAuthComponent))
}
