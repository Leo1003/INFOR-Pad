import File from '../components/pad/File.jsx'
import { connect } from 'react-redux'
import { fetchGetFiles, initialRedirect } from '../actions/filesActions'


const mapStateToProps = (state) => {
  return {
    name: state.user.name,
    sessionid: state.session.sessionid,
    isFetching: state.ui.isFetching,
    cur_file: state.file,
    user: state.user,
    redirectToError: state.ui.redirectToError
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleGetFiles: (sessionid, fsid, format) => {
    dispatch(fetchGetFiles(sessionid, fsid, format))
  },
  initialRedirect: () => {
    dispatch(initialRedirect())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(File)
