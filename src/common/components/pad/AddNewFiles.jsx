import React from 'react'
import { Dropdown, Modal, Header, Button, Icon } from 'semantic-ui-react'

class AddNewFiles extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddNewFolder = this.handleAddNewFolder.bind(this)
    this.addNewFolder = this.addNewFolder.bind(this)
    this.addNewFile = this.addNewFile.bind(this)
  }
  handleAddNewFolder(e, data) {
    console.log("addnewfolder")
    console.log(data)
  }
  componentDidMount() {
  }
  addNewFolder() {
    $('.ui.small.modal.addNewFolderModal').modal({ blurring: true }).modal('show')
  }
  addNewFile() {
    $('.ui.small.modal.addNewFileModal').modal({ blurring: true }).modal('show')
  }
  render() {
    return (
      <div>
        <div className="ui dropdown button basic">
          <i className='plus icon'></i>
          <div className="text">New</div>
          <div className="menu">
            <div className="item" onClick={this.addNewFolder}><i className='folder icon'></i>New Folder</div>
            <div className="item" onClick={this.addNewFile}><i className='file icon'></i>New File</div>
          </div>
        </div>

        <div className="ui small modal addNewFolderModal">
          <div className="ui icon header">
            <i className="folder icon"></i>
            Add a new Folder
          </div>
          <div className="content">
            <p>Folder Form</p>
          </div>
          <div className="actions">
            <div className="ui basic cancel button">
              <i className="remove icon"></i>
              Cancel
            </div>
            <div className="ui blue ok button">
              <i className="checkmark icon"></i>
              Add
            </div>
          </div>
        </div>

        <div className="ui small modal addNewFileModal">
          <div className="ui icon header">
            <i className="file icon"></i>
            Add a new File
          </div>
          <div className="content">
            <p>File Form</p>
          </div>
          <div className="actions">
            <div className="ui basic cancel button">
              <i className="remove icon"></i>
              No
            </div>
            <div className="ui blue ok button">
              <i className="checkmark icon"></i>
              Yes
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default AddNewFiles
