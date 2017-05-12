import React from 'react'
import { connect } from 'react-redux'
import { fetchAddNewFiles } from '../../actions/filesActions'
import { AddNewFolderModal } from './AddNewFolderModal.jsx'
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
      onApprove: () => { return true }
    }).modal('show')
  }
  render() {
    return (
      <div>
        <div className="ui dropdown button basic">
          <i className='plus icon'></i>
          New
          <div className="menu">
            <div className="item" onClick={this.newFolderModal}><i className='folder icon'></i>New Folder</div>
            <div className="item" onClick={this.newFileModal}><i className='file icon'></i>New File</div>
          </div>
        </div>

        <AddNewFolderModal handleAddNewFiles={this.props.handleAddNewFiles} id={this.props.id} sessionid={this.props.sessionid}/>
        <AddNewFileModal handleAddNewFiles={this.props.handleAddNewFiles} id={this.props.id} sessionid={this.props.sessionid}/>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  sessionid : state.session.sessionid,
})

const mapDispatchToProps = (dispatch) => ({
  handleAddNewFiles: (filename, folderid, sessionid, format) => {
    dispatch(fetchAddNewFiles(filename, folderid, sessionid, format))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewFilesDropdown)
