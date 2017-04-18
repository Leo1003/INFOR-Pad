import { connect } from 'react-redux'
import Sign_up from '../components/Sign_up.jsx'

import { signUp } from '../actions/authActions.js'

const mapStateToProps = (state) => {
  return {
    message: state.auth.message
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
