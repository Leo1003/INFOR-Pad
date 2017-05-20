import React from 'react'

class AddNewFolderModal extends React.Component {
  constructor(props) {
    super(props)
    this.inputChange = this.inputChange.bind(this)
    this.state = {
      foldername: ''
    }
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
    console.log(this.refs)
    this.props.handleAddNewFiles(this.refs.foldername.value, this.props.id, this.props.sessionid, "Directory")  //(filename, folderid, sessionid) 
    this.setState({
      foldername: ''
    })
    $('#addfolderform').form('reset')
    $('#addNewFolderModal').modal('hide')
    this.props.handlefetchGetFiles(this.props.sessionid, this.props.id, "Directory")
    
  }
  handleFolderInvalid(e) {
    return false
  }
  inputChange(e) {
    this.setState({
      foldername: e.target.value
    })
  }
  render () {
    return (
      <div className="ui small modal" id="addNewFolderModal">
        <div className="ui icon header">
          <i className="folder icon"></i>
          { this.props.lang == 'en' ? 'Add a new Folder' : 'إضافة مجلد جديد' }
        </div>
        <div className="content">

          <form className="ui form" id="addfolderform">
            <div className="field">
              <input type="text" name="foldername"  placeholder={this.props.lang == 'en' ? 'Folder Name...' : 'إسم الملف...'} ref='foldername' />
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui basic cancel button">
            <i className="remove icon"></i>
            { this.props.lang == 'en' ? 'Cancel' : 'إلغاء' }
          </div>
          <button className="ui blue button" type="submit" form='addfolderform'>
            <i className="checkmark icon"></i>
            { this.props.lang == 'en' ? 'Add' : 'إضافة' }
          </button>
        </div>
      </div>
    )
  }
}


export default AddNewFolderModal