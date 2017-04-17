import { connect } from 'react-redux'
import Sign_in from '../components/Sign_in.jsx'

import signIn from '../actions/authActions'

const mapStateToProps = (state) => {
  // console.log("I'm in container")
  //console.log(state)
  return {
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
