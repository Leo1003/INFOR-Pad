import React from 'react'

class AddNewFiles extends React.Component {
  constructor(props) {
    super(props)
    this.newFolderModal = this.newFolderModal.bind(this)
    this.newFileModal = this.newFileModal.bind(this)
  }
  componentDidMount() {
    $('#addfileform').form({
      fields: {
        filename: {
          identifier: 'filename',
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
      onSuccess: this.handleAddNewFile.bind(this)
    })
    $('#addfolderform').form({
      fields: {
        foldername: {
          identifier: 'foldername',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a Folder Name'
            }
          ]
        }
      },
      inline: true,
      onFailure: this.handleInvalid.bind(this),
      onSuccess: this.handleAddNewFolder.bind(this)
    })
    $('.ui.dropdown').dropdown()
  }
  handleAddNewFile(e) {
    e.preventDefault()
  }
  handleAddNewFolder(e) {
    e.preventDefault()
    const formData = {}
    for(const field in this.refs) {
      formData[field] = this.refs[field].value
    }
    $('#addfolderform').form('clear')
    $('.ui.small.modal.addNewFolderModal').modal('hide')
    this.props.handleAddNewFolder(formData['foldername'], this.props.id, this.props.sessionid)  //(filename, folderid, sessionid)
  }
  handleInvalid(e) {
    return false
  }
  newFolderModal() {
    $('.ui.small.modal.addNewFolderModal').modal({
      blurring: true,
      onDeny: () => {
        $('#addfolderform').form('clear')
      }
      }).modal('show')
  }
  newFileModal() {
    $('.ui.small.modal.addNewFileModal').modal({
      blurring: true,
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
          <div className="text">New</div>
          <div className="menu">
            <div className="item" onClick={this.newFolderModal}><i className='folder icon'></i>New Folder</div>
            <div className="item" onClick={this.newFileModal}><i className='file icon'></i>New File</div>
          </div>
        </div>

        <div className="ui small modal addNewFolderModal">
          <div className="ui icon header">
            <i className="folder icon"></i>
            Add a new Folder
          </div>
          <div className="content">

            <form className="ui form" id="addfolderform">
              <div className="field">
                <input type="text" name="foldername" ref='foldername' placeholder='Folder Name...' />
              </div>
            </form>

          </div>
          <div className="actions">
            <div className="ui basic cancel button">
              <i className="remove icon"></i>
              Cancel
            </div>
            <button className="ui blue button" type="submit" form='addfolderform'>
              <i className="checkmark icon"></i>
              Add
            </button>
          </div>
        </div>

        <div className="ui small modal addNewFileModal">
          <div className="ui icon header">
            <i className="file icon"></i>
            Add a new File
          </div>
          <div className="content">

            <form className="ui form" id="addfileform">
              <div className="field">
                <input type="text" name="filename" ref='filename' placeholder='File Name...' />
              </div>
            </form>

          </div>
          <div className="actions">
            <div className="ui basic cancel button">
              <i className="remove icon"></i>
              Cancel
            </div>
            <button className="ui blue button" type="submit" form='addfileform'>
              <i className="checkmark icon"></i>
              Add
            </button>
          </div>
        </div>
      </div>

    )
  }
}

export default AddNewFiles
