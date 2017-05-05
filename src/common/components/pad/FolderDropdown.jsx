import React from 'react'
import { fetchDeleteFile } from '../../actions/filesActions'
import { connect } from 'react-redux'

class FolderDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.handleActions = this.handleActions.bind(this)
  }
  componentDidMount() {
  }
  handleActions(e) {
    e.preventDefault()
    let selected = $(`#${this.props.id}`).dropdown('get value')
    if(selected === "delete") {
      this.props.handleDelete(this.props.id, this.props.sessionid, this.props.folderid)
    }
  }
  render() {
    return (
      <div className="ui dropdown" id={this.props.id}>
        <div className="text"></div>
        <i className="dropdown icon"></i>
        <div className="menu">
          <div className="item" data-value='public'><i className='add user icon'></i>Public</div>
          <div className="item" data-value='share'><i className='external share icon'></i>shareid</div>
          <div className="item" data-value='open_editor'><i className='file code outline icon'></i>Open with Editor</div>
          <div className="divider"></div>
          <div className="item" data-value='rename'><i className='edit icon'></i>Rename</div>
          <div className="item" data-value='move'><i className='level up icon'></i>Move</div>
          <div className="item" data-value='delete' onClick={this.handleActions}><i className='remove icon'></i>Delete</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  handleDelete: (fsid, sessionid, folderid) => {
    dispatch(fetchDeleteFile(fsid, sessionid, folderid))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderDropdown)
