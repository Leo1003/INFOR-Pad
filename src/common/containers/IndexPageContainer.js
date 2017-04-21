import { connect } from 'react-redux'
import IndexPage from '../components/IndexPage.jsx'

const mapStateToProps = (state) => {
  console.log("index")
  console.log(state)
  return {
    isLogin: state.session.isLogin,
    sessionid: state.session.sessionid,
    userid: state.session.userid
  }
}

export default connect(mapStateToProps)(IndexPage)
