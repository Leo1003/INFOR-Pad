import React from 'react'
import { connect } from 'react-redux'
import { fetchDeleteFile, fetchCheckPermission } from '../../actions/filesActions'
import { Link } from 'react-router'
import { fetchGetUserById } from '../../actions/userActions'
const moment = require('moment')

class FolderModal extends React.Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.state = {
      isChecked: this.props.file.isPublic,
    }
  }
  openModal() {
    this.props.handleGetUserById(this.props.file.owner)
    if(!this.props.isFetching) $(`#${this.props.file.id}`).modal('show')
  }
  deleteFile() {
    $(`#${this.props.file.id}`).modal('hide')
    this.props.handleDelete(this.props.file.id, this.props.sessionid, this.props.folderid)
  }
  handleCheckPermission = () => {
    this.setState({
      isChecked: !this.state.isChecked
    })
    console.log(this.state.isChecked)
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps)
    console.log(nextState.isChecked)
    if(this.state.isChecked !== nextState.isChecked) this.props.handleCheckPermission(this.props.file.id, this.props.sessionid, nextState.isChecked.toString())
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
            <p><b>Owner: </b>&nbsp;<a href={'/user/' + this.props.ownername}>{this.props.ownername}</a></p>
            <p><b>Location: </b>&nbsp;{this.props.foldername}</p>
            <p><b>CreateDate: </b>&nbsp;{moment(this.props.file.createDate).subtract(10, 'days').calendar()}</p>
            <p><b>Last Modify: </b>&nbsp;{moment(this.props.file.modifyDate).subtract(10, 'days').calendar()}</p>
            {this.props.file.shortid.length > 0 ? <p><b>Share ID:</b>&nbsp;{this.props.file.shortid}</p> : null}
            { this.props.ownername === this.props.username ?
              <div>
                <div className="ui divider"></div>
                <div className="ui toggle checkbox">
                  <input type="checkbox" name="isPublic" onChange={this.handleCheckPermission} checked={this.state.isChecked} />
                  <label><b>Public</b></label>
                  <p>{this.state.isChecked.toString()}</p>
                </div>
                <br />
                <br />
                <div className="small ui basic red button" onClick={this.deleteFile}>
                  <i className="trash icon"></i>
                  Delete
                </div>
              </div> : null
            }
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

const mapStateToProps = (state) => ({
  ownername: state.ui.name,
  username: state.user.name,
  isFetching: state.ui.isFetching,
})
const mapDispatchToProps = (dispatch) => ({
  handleDelete: (fsid, sessionid, folderid) => {
    dispatch(fetchDeleteFile(fsid, sessionid, folderid))
  },
  handleGetUserById: (userid) => {
    dispatch(fetchGetUserById(userid))
  },
  handleCheckPermission: (fsid, sessionid, check) => {
    dispatch(fetchCheckPermission(fsid, sessionid, check))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderModal)
