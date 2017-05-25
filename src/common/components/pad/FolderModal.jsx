import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchDeleteFile, fetchCheckPermission, fetchModifyFile } from '../../actions/filesActions'
import { Link } from 'react-router'
import { fetchGetUserById } from '../../actions/userActions'
import MoveFileModal from './MoveFileModal.jsx'
const moment = require('moment')

class FolderModal extends React.Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.initialForm = this.initialForm.bind(this)
    this.handleDes = this.handleDes.bind(this)
    this.handleLan = this.handleLan.bind(this)
    this.state = {
      isChecked: this.props.file.isPublic,
    }
  }
  openModal() {
    $(`#${this.props.file.id}_modal`).modal('show')
  }
  deleteFile() {
    $(`#${this.props.file.id}_modal`).modal('hide')
    this.props.handleDelete(this.props.file.id, this.props.sessionid, this.props.folder.id)
  }
  handleCheckPermission = (fsid, isPublic) => {
    console.log(!isPublic)
    this.props.handleCheckPermission(fsid, this.props.sessionid, !isPublic)
  }
  handleRenameFile(e) {
    e.preventDefault()
    this.props.handleModifyFile(this.props.sessionid, this.props.file.id, 'filename', this.refs.renameValue.value)
    $(ReactDOM.findDOMNode(this.refs.renameForm)).form('clear')
    $(`#${this.props.file.id}_renameModal`).modal('hide')
  }
  handleDes(e) {
    e.preventDefault()
    this.props.handleModifyFile(this.props.sessionid, this.props.file.id, 'description', this.refs.descriptionValue.value)
    $(ReactDOM.findDOMNode(this.refs.descriptionForm)).form('clear')
    $(`#${this.props.file.id}_descriptionModal`).modal('hide')
  }
  handleLan(e) {
    e.preventDefault()
    this.props.handleModifyFile(this.props.sessionid, this.props.file.id, 'format', this.refs.lanValue.value)
    $(ReactDOM.findDOMNode(this.refs.lanForm)).form('clear')
    $(`#${this.props.file.id}_lanModal`).modal('hide')
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
    if(this.props.file.id.length > 0) {
      $(`#${this.props.file.id}_renameModal`).modal(
        'attach events', `#${this.props.file.id}_modal #openRename`
      )
      $(`#${this.props.file.id}_moveModal`).modal(
        'attach events', `#${this.props.file.id}_modal #openMove`
      )
      $(`#${this.props.file.id}_descriptionModal`).modal(
        'attach events', `#${this.props.file.id}_modal #openDescription`
      )
      if(this.props.file.format !== 'Directory') {
        $(`#${this.props.file.id}_lanModal`).modal(
          'attach events', `#${this.props.file.id}_modal #openLan`
        )
      }
    }
    this.initialForm()
     
  }
  componentWillReceiveProps(nextProps) {
    console.log("folder modal receive props")
    // console.log(this.props)
    // console.log(nextProps)
  }
  componentWillUpdate(nextProps, nextState) {
   // if(this.state.isChecked !== nextState.isChecked) this.props.handleCheckPermission(this.props.file.id, this.props.sessionid, nextState.isChecked.toString())
  }
  componentDidUpdate() {
    if(this.props.file.id.length > 0) {
      $(`#${this.props.file.id}_renameModal`).modal(
        'attach events', `#${this.props.file.id}_modal #openRename`
      )
      $(`#${this.props.file.id}_moveModal`).modal(
        'attach events', `#${this.props.file.id}_modal #openMove`
      )
      $(`#${this.props.file.id}_descriptionModal`).modal(
        'attach events', `#${this.props.file.id}_modal #openDescription`
      )
      if(this.props.file.format !== 'Directory') {
        $(`#${this.props.file.id}_lanModal`).modal(
        'attach events', `#${this.props.file.id}_modal #openLan`
        )
      }
    }
     this.initialForm()
  }
  componentWillUnmount() {
    $(`#${this.props.file.id}_renameModal`).remove()
    $(`#${this.props.file.id}_moveModal`).remove()
    $(`#${this.props.file.id}_descriptionModal`).remove()
    $(`#${this.props.file.id}_lanModal`).remove()
    $(`#${this.props.file.id}_modal`).remove()
    $(ReactDOM.findDOMNode(this.refs.renameForm)).remove() //remove jQuery DOM
  }
  render() {
    return(
      <div>
        <div className="ui main modal" id={this.props.file.id + '_modal'}>
          <div className="header">
            {this.props.file.name}
          </div>
          <div className="content">
            <p><b>Name: </b>&nbsp;{this.props.file.name}</p>
            <p><b>Type: </b>&nbsp;{this.props.file.format}</p>
            { this.props.file.format !== 'Directory' ? <p><b>Size: </b>&nbsp;{this.props.file.size > 1024 ? `${(this.props.file.size / 1024).toFixed(2)} KB` : `${this.props.file.size} Byte`}</p> : null}
            <p><b>Owner: </b>&nbsp;{this.props.owner.name}</p>
            <p><b>Location: </b>&nbsp;{this.props.folder.name}</p>
            <p><b>CreateDate: </b>&nbsp;{moment(this.props.file.createDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><b>Last Modify: </b>&nbsp;{moment(this.props.file.modifyDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p style={{wordBreak: "break-all"}}><b>Description: </b>&nbsp;{this.props.file.description}</p>
            {this.props.file.isPublic ? <p><b>Share ID:</b>&nbsp;<a href={'/' + this.props.file.shortid }>{this.props.file.shortid}</a></p> : null}
            { this.props.file.owner === this.props.userid ?
              <div>
                <div className="ui divider"></div>
                <div className="ui toggle checkbox">
                  <input type="checkbox" name="isPublic" onChange={() => this.handleCheckPermission(this.props.file.id, this.props.file.isPublic)} checked={this.props.file.isPublic} />
                  <label><b>Public</b></label>
                </div>
                <br />
                <br />
                <button className='small ui basic button' id="openRename">
                  Rename
                </button>
                <button className='small ui basic button' id="openDescription">
                  Update Description
                </button>
                {this.props.file.format !== 'Directory' ? <button className='small ui basic button' id="openLan">
                  Change Language
                </button> : null}
                <button className='small ui basic button' id="openMove">
                  Move File
                </button>
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
        {/*renameModal*/}
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

        {/*updateDescriptionModal*/}
        <div className="ui small modal" id={this.props.file.id + '_descriptionModal'}>
          <div className="header">
            Update Description
          </div>
          <div className="content">
            <form className="ui form" id={this.props.file.id + '_descriptionForm'} ref="descriptionForm" onSubmit={this.handleDes}>
              <div className="field">
                <input type="text" name="description" placeholder="Write new description" ref="descriptionValue" />
              </div>
            </form>
          </div>
          <div className="actions">
            <div className="ui basic deny button">
              Cancel
            </div>
            <button className="ui blue button" type="submit" form={this.props.file.id + '_descriptionForm'}>Update</button>
          </div>
        </div>
        {/*changeLanguageModal*/}
        <div className="ui small modal" id={this.props.file.id + '_lanModal'}>
          <div className="header">
            Change Language
          </div>
          <div className="content">
            <form className="ui form" id={this.props.file.id + '_lanForm'} ref="lanForm" onSubmit={this.handleLan}>
              <div className="field">
                <select className="ui search dropdown" ref='lanValue'>
                      <option value="C">C</option>
                      <option value="CPP">CPP</option>
                      <option value="CPP11">CPP11</option>
                      <option value="CPP14">CPP14</option>
                      <option value="CSharp">CSharp</option>
                      <option value="Python2">Python2</option>
                      <option value="Python3">Python3</option>
                      <option value="Java">Java</option>
                      <option value="JSX">JSX</option>
                      <option value="HTML">HTML</option>
                      <option value="XML">XML</option>
                      <option value="CSS">CSS</option>
                      <option value="Stylus">Stylus</option>
                      <option value="Scss">Scss</option>
                      <option value="Less">Less</option>
                      <option value="Javascript">Javascript</option>
                      <option value="JSON">JSON</option>
                      <option value="Swift">Swift</option>
                      <option value="ObjectiveC">ObjectiveC</option>
                      <option value="PHP">PHP</option>
                      <option value="Haskell">Haskell</option>
                      <option value="Markdown">Markdown</option>
                      <option value="Bash">Bash</option>
                      <option value="Plain_Text">Plain_Text</option>
                  </select>
              </div>
            </form>
          </div>
          <div className="actions">
            <div className="ui basic deny button">
              Cancel
            </div>
            <button className="ui blue button" type="submit" form={this.props.file.id + '_lanForm'}>Update</button>
          </div>
        </div>
        {/*moveModal*/}
        <MoveFileModal folder={this.props.folder} file={this.props.file} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userid: state.user.id,
  isFetching: state.ui.isFetching
})
const mapDispatchToProps = (dispatch) => ({
  handleDelete: (fsid, sessionid, folderid) => {
    dispatch(fetchDeleteFile(fsid, sessionid, folderid))
  },
  handleCheckPermission: (fsid, sessionid, check) => {
    dispatch(fetchCheckPermission(fsid, sessionid, check))
  },
  handleModifyFile: (sessionid, fsid, newType, newVal) => {
    dispatch(fetchModifyFile(sessionid, fsid, newType, newVal))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderModal)
