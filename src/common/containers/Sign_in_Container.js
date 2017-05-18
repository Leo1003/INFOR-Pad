import { connect } from 'react-redux'
import Sign_in from '../components/Sign_in.jsx'

import { fetchSignIn } from '../actions/sessionActions.js'
import { fetchGetInitialUser } from '../actions/userActions'

const mapStateToProps = (state) => {
  return {
    //message: state.auth.get('message')
    error_message: state.session.error_message,
    isLogin: state.session.isLogin,
    lang: state.ui.lang
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignIn: (formData, autologin) => {
      dispatch(fetchSignIn(formData, autologin))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sign_in)
