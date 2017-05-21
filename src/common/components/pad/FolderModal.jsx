import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchDeleteFile, fetchCheckPermission, fetchRename } from '../../actions/filesActions'
import { Link } from 'react-router'
import { fetchGetUserById } from '../../actions/userActions'
const moment = require('moment')

class FolderModal extends React.Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.initialForm = this.initialForm.bind(this)
    this.state = {
      isChecked: this.props.file.isPublic,
    }
  }
  openModal() {
    $(`#${this.props.file.id}`).modal('show')
  }
  deleteFile() {
    $(`#${this.props.file.id}`).modal('hide')
    this.props.handleDelete(this.props.file.id, this.props.sessionid, this.props.folderid)
  }
  handleCheckPermission = () => {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }
  handleRenameFile(e) {
    e.preventDefault()
    console.log(this.refs.renameValue.value)
    this.props.handleRename(this.props.sessionid, this.props.file.id, this.refs.renameValue.value)
    $(ReactDOM.findDOMNode(this.refs.renameForm)).form('clear')
    $(`#${this.props.file.id}_renameModal`).modal('hide')
  }
  handleInvalid() {
    return false
  }
  initialForm() {
    $(ReactDOM.findDOMNode(this.refs.renameForm)).form({
      fields: {
        rename: {
          identifier: 'rename',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a File Name'
            }
          ]
        }
      },
      inline: true,
      onFailure: this.handleInvalid.bind(this),
      onSuccess: this.handleRenameFile.bind(this)
    })
  }
  componentDidMount() {
    console.log("did mount")
    $(`#${this.props.file.id}_renameModal`).modal(
      'attach events', `#${this.props.file.id} #openRename`
    )
    this.initialForm()
     
  }
  componentWillUpdate(nextProps, nextState) {
    if(this.state.isChecked !== nextState.isChecked) this.props.handleCheckPermission(this.props.file.id, this.props.sessionid, nextState.isChecked.toString())
  }
  componetDidUpdate() {
     this.initialForm()
  }
  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this.refs.renameForm)).remove() //remove jQuery DOM
  }
  render() {
    return(
      <div>
        <i className="archive large link icon" onClick={this.openModal}></i>
        <div className="ui main modal" id={this.props.file.id}>
          <div className="header">
            {this.props.file.name}
          </div>
          <div className="content">
            <p><b>Name: </b>&nbsp;{this.props.file.name}&nbsp;&nbsp;&nbsp;
              { this.props.file.owner === this.props.userid ? <button className="ui icon button" id='openRename' style={{position: 'absolute', right: '2%'}}><i className="large edit icon"></i></button> : null }
            </p>
            <p><b>Type: </b>&nbsp;{this.props.file.format}</p>
            <p><b>Owner: </b>&nbsp;<a href={'/user/' + this.props.owner.name}>{this.props.owner.name}</a></p>
            <p><b>Location: </b>&nbsp;{this.props.foldername}</p>
            <p><b>CreateDate: </b>&nbsp;{moment(this.props.file.createDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><b>Last Modify: </b>&nbsp;{moment(this.props.file.modifyDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
            {this.props.file.isPublic ? <p><b>Share ID:</b>&nbsp;<a href={'/' + this.props.file.shortid }>{this.props.file.shortid}</a></p> : null}
            { this.props.file.owner === this.props.userid ?
              <div>
                <div className="ui divider"></div>
                <div className="ui toggle checkbox">
                  <input type="checkbox" name="isPublic" onChange={this.handleCheckPermission} checked={this.state.isChecked} />
                  <label><b>Public</b></label>
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
          </div>
        </div>
        <div className="ui small modal" id={this.props.file.id + '_renameModal'}>
          <div className="header">
            Rename
          </div>
          <div className="content">
            <form className="ui form" id={this.props.file.id + '_renameForm'} ref="renameForm">
              <div className="field">
                <input type="text" name="rename" placeholder="Enter new name" ref="renameValue" />
              </div>
             
            </form>
          </div>
          <div className="actions">
            <div className="ui basic deny button">
              Cancel
            </div>
            <button className="ui blue button" type="submit" form={this.props.file.id + '_renameForm'}>Rename</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userid: state.user.id,
  isFetching: state.ui.isFetching,
})
const mapDispatchToProps = (dispatch) => ({
  handleDelete: (fsid, sessionid, folderid) => {
    dispatch(fetchDeleteFile(fsid, sessionid, folderid))
  },
  handleCheckPermission: (fsid, sessionid, check) => {
    dispatch(fetchCheckPermission(fsid, sessionid, check))
  },
  handleRename: (sessionid, fsid, newName) => {
    dispatch(fetchRename(sessionid, fsid, newName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderModal)
