import React from 'react'
import { connect } from 'react-redux'
import { fetchDeleteFile } from '../../actions/filesActions'
const moment = require('moment')

class FolderModal extends React.Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
  }
  openModal() {
    $(`#${this.props.file.id}`).modal('show')
  }
  deleteFile() {
    $(`#${this.props.file.id}`).modal('hide')
    this.props.handleDelete(this.props.file.id, this.props.sessionid, this.props.folderid)
  }
  render() {
    return(
      <div>
          <i className="archive large link icon" onClick={this.openModal}></i>

        <div className="ui small modal" id={this.props.file.id}>
          <div className="header">
            {this.props.file.name}
          </div>
          <div className="content">
            <p><b>Name: </b>&nbsp;{this.props.file.name}</p>
            <p><b>Type: </b>&nbsp;{this.props.file.format}</p>
            <p><b>Owner: </b>&nbsp;{this.props.file.owner}</p>
            <p><b>Location: </b>&nbsp;{this.props.file.parent}</p>
            <p><b>CreateDate: </b>&nbsp;{moment(this.props.file.createDate).subtract(10, 'days').calendar()}</p>
            <p><b>Last Modify: </b>&nbsp;{moment(this.props.file.modifyDate).subtract(10, 'days').calendar()}</p>
            <div className="ui divider"></div>
            <div className="ui toggle checkbox">
              <input type="checkbox" name="isPublic" />
              <label><b>Public</b></label>
            </div>
            <br />
            <br />
            <div className="small ui basic red button" onClick={this.deleteFile}>
              <i className="trash icon"></i>
              Delete
            </div>
          </div>
          <div className="actions">
            <div className="ui basic deny button">
              Close
            </div>
            <div className="ui disabled blue ok button">
              Save
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FolderModal)
