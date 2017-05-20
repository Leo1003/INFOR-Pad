import React from 'react'
import { connect } from 'react-redux'
import { fetchAddNewFiles, fetchGetFiles } from '../../actions/filesActions'
import  AddNewFolderModal  from './AddNewFolderModal.jsx'
import { AddNewFileModal } from './AddNewFileModal.jsx'

class AddNewFilesDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.newFolderModal = this.newFolderModal.bind(this)
    this.newFileModal = this.newFileModal.bind(this)
  }
  newFolderModal() {
    $('#addNewFolderModal').modal({
      onDeny: () => {
        $('#addfolderform').form('clear')
      }
      }).modal('show')
  }
  newFileModal() {
    $('#addNewFileModal').modal({
      onDeny: () => {
        $('#addfileform').form('clear')
      },
     //onApprove: () => { return true }
    }).modal('show')
  }
  render() {
    return (
      <div>
        <div className="ui dropdown button basic">
          <i className='plus icon'></i>
          {this.props.lang == 'en' ? 'New' : 'الجديد'}
          <div className="menu">
            <div className="item" onClick={this.newFolderModal}><i className='folder icon'></i>{this.props.lang == 'en' ? 'New Folder' : 'ملف جديد'}</div>
            <div className="item" onClick={this.newFileModal}><i className='file icon'></i>{this.props.lang == 'en' ? 'New File' : 'ملف جديد'}</div>
          </div>
        </div>

        <AddNewFolderModal handleAddNewFiles={this.props.handleAddNewFiles} handlefetchGetFiles={this.props.handlefetchGetFiles} id={this.props.id} sessionid={this.props.sessionid} lang={this.props.lang}/>
        <AddNewFileModal handleAddNewFiles={this.props.handleAddNewFiles} handlefetchGetFiles={this.props.handlefetchGetFiles} id={this.props.id} sessionid={this.props.sessionid} lang={this.props.lang}/>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  sessionid : state.session.sessionid,
  lang: state.ui.lang
})

const mapDispatchToProps = (dispatch) => ({
  handleAddNewFiles: (filename, folderid, sessionid, format) => {
    dispatch(fetchAddNewFiles(filename, folderid, sessionid, format))
  },
  handlefetchGetFiles: (sessionid, fsid, format) => {
    dispatch(fetchGetFiles(sessionid, fsid, format))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFilesDropdown)
