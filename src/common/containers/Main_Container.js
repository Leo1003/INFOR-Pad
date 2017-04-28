import { connect } from 'react-redux'
import Main from '../components/Main.jsx'
import { GetInitialSession } from '../actions/sessionActions'
import { fetchGetInitialUser } from '../actions/userActions'

const mapStateToProps = (state) => {
  // console.log("main")
  // console.log(state)
  return {
    isLogin: state.session.isLogin,
    sessionid: state.session.sessionid,
    name: state.user.name,
    isFetching: state.ui.isFetching
  }
}

export default connect(mapStateToProps)(Main)
