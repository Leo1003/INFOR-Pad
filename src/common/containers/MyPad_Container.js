import MyPad from '../components/MyPad.jsx'
import { connect } from 'react-redux'
import { fetchGetFiles } from '../actions/filesActions'


const mapStateToProps = (state) => {
  console.log(state)
  return {
    name: state.user.name,
    rootfsid: state.user.rootfsid,
    sessionid: state.session.sessionid,
    isFetching: state.ui.isFetching,
    cur_folder: state.folder
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleGetFiles: (sessionid, fsid) => {
    dispatch(fetchGetFiles(sessionid, fsid))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPad)
