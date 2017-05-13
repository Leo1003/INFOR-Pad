import Folder from '../components/pad/Folder.jsx'
import { connect } from 'react-redux'
import { fetchGetFiles } from '../actions/filesActions'


const mapStateToProps = (state) => {
  return {
    name: state.user.name,
    sessionid: state.session.sessionid,
    isFetching: state.ui.isFetching,
    cur_folder: state.folder,
    userid: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleGetFiles: (sessionid, fsid, format) => {
    dispatch(fetchGetFiles(sessionid, fsid, format))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Folder)
