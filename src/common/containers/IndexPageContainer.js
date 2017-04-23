import { connect } from 'react-redux'
import IndexPage from '../components/IndexPage.jsx'
import { GetInitialSession } from '../actions/sessionActions'

const mapStateToProps = (state) => {
  console.log("index")
  console.log(state)
  return {
    isLogin: state.session.isLogin,
    sessionid: state.session.sessionid,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetInitialSession: () => {
      dispatch(GetInitialSession())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
