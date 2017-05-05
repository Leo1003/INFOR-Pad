import { connect } from 'react-redux'
import Sign_up from '../components/Sign_up.jsx'

import { fetchSignUp } from '../actions/sessionActions.js'

const mapStateToProps = (state) => {
  return {
    error_message: state.session.error_message,
    isLogin: state.session.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (formData) => {
      dispatch(fetchSignUp(formData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sign_up)
