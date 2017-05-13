import File from '../components/pad/File.jsx'
import { connect } from 'react-redux'
import { fetchGetFiles } from '../actions/filesActions'


const mapStateToProps = (state) => {
  return {
    name: state.user.name,
    sessionid: state.session.sessionid,
    isFetching: state.ui.isFetching,
    cur_file: state.file,
    userid: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleGetFiles: (sessionid, fsid) => {
    dispatch(fetchGetFiles(sessionid, fsid))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(File)
