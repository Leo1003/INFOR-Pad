import MyPad from '../components/pad/MyPad.jsx'
import { connect } from 'react-redux'
import { fetchGetFiles, fetchAddNewFolder  } from '../actions/filesActions'


const mapStateToProps = (state) => {
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
  },
  handleAddNewFolder: (filename, folderid, sessionid) => {
    dispatch(fetchAddNewFolder(filename, folderid, sessionid))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPad)
