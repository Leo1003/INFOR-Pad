import { connect } from 'react-redux'
import Logout from '../components/Logout.jsx'

import { fetchLogout } from '../actions/sessionActions'

const mapStateToProps = (state) => {
  return {
    lang: state.ui.lang
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: (sessionid) => {
      dispatch(fetchLogout(sessionid))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
