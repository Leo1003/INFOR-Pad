import { connect } from 'react-redux'
import Sign_in from '../components/Sign_in.jsx'

import { signIn } from '../actions/authActions.js'

const mapStateToProps = (state) => {
  console.log("sign in")
  console.log(state)
  return {
    //message: state.auth.get('message')
    message: state.auth.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignin: (formData) => {
      dispatch(signIn(formData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sign_in)
