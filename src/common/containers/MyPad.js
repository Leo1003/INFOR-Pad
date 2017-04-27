import MyPad from '../components/MyPad.jsx'
import { connect } from 'react-redux'
import { fetchGetFile } from '../actions/fileActions'

const mapStateToProps = (state) => ({
  name: this.user.name,
  rootfsid: this.user.rootfsid,
  sessionid: this.session.sessionid
})

const mapDispatchToProps = (dispatch) => ({
  handleGetFile: (sessionid, fsid) => {
    dispatch(fetchGetFile(sessionid, fsid))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPad)
