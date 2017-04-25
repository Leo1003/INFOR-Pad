import { connect } from 'react-redux'
import UserPage from '../components/UserPage.jsx'

const mapStateToProps = (state) => {
  return {
    name: state.user.name
  }
}

export default connect(mapStateToProps)(UserPage)
