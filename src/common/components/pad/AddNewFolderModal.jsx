import React from 'react'

export class AddNewFolderModal extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
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
      onFailure: this.handleFolderInvalid.bind(this),
      onSuccess: this.handleAddNewFolder.bind(this)
    })
  }

  handleAddNewFolder(e) {
    e.preventDefault()
    const formData = {}
    for(const field in this.refs) {
      formData[field] = this.refs[field].value
    }
    $('#addfolderform').form('clear')
    $('#addNewFolderModal').modal('hide')
    this.props.handleAddNewFiles(formData['foldername'], this.props.id, this.props.sessionid, "Directory")  //(filename, folderid, sessionid)
  }
  handleFolderInvalid(e) {
    return false
  }
  render () {
    return (
      <div className="ui small modal" id="addNewFolderModal">
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
    )
  }
}
