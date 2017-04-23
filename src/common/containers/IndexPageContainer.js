import { connect } from 'react-redux'
import IndexPage from '../components/IndexPage.jsx'
import { GetInitialSession } from '../actions/sessionActions'
import { fetchGetInitialUser } from '../actions/userActions'

const mapStateToProps = (state) => {
  console.log("index")
  console.log(state)
  return {
    isLogin: state.session.isLogin,
    sessionid: state.session.sessionid,
    name: state.user.name,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetInitialSession: () => {
      dispatch(GetInitialSession())
    },
    handleGetInitialUser: (sessionid) => {
      dispatch(fetchGetInitialUser(sessionid))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
