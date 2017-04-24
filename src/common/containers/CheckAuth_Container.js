import { connect }from 'react-redux'
import CheckAuth from '../components/CheckAuth.jsx'

const mapStateToProps = (state) => {
  return {
    isLogin: state.session.isLogin
  }
}

export default connect(mapStateToProps)(CheckAuth)
