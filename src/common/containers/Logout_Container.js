import { connect } from 'react-redux'
import Logout from '../components/Logout.jsx'

import { logOut } from '../actions/authActions'

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => {
      dispatch(logOut())
    }
  }
}

export default connect(maptDispatchToProps)(Logout)
