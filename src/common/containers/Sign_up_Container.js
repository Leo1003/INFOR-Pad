import { connect } from 'react-redux'
import Sign_up from '../components/Sign_up.jsx'

import { signUp } from '../actions/authActions.js'

const mapStateToProps = (state) => {
  console.log("sign up")
  console.log(state)
  return {
    //message: state.auth.get('message')
    error_message: state.session.error_message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignup: (formData) => {
      dispatch(signUp(formData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sign_up)
