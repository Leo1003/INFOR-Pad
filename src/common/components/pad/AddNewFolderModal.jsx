import React from 'react'
import { connect } from 'react-redux'
import { addFoldername } from '../../actions/filesActions'

class AddNewFolderModal extends React.Component {
  constructor(props) {
    super(props)
    this.inputChange = this.inputChange.bind(this)
  }
  componentWillMount() { console.log("will mount")}
  componentWillReceiveProps() { console.log("receive props") }
  shouldComponentUpdate() { 
    console.log("shoud update")
    return true
  }
  componentWillUpdate() { console.log("will update") }
  componentDidUpdate() { console.log("did update") }
  componentUnMount() { console.log("will unmount") }
  componentDidMount() {
    console.log("did mount")
    this.props.handleAddFoldername('')
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
    this.props.handleAddNewFiles(this.props.foldername, this.props.id, this.props.sessionid, "Directory")  //(filename, folderid, sessionid) 
    this.props.handleAddFoldername('')
    $('#addNewFolderModal').modal('hide')
     this.props.handlefetchGetFiles(this.props.sessionid, this.props.id, "Directory")
  }
  handleFolderInvalid(e) {
    console.log(this.props.foldername)
    return false
  }
  inputChange(e) {
    this.props.handleAddFoldername(e.target.value)
  }
  render () {
    console.log("render")
    return (
      <div className="ui small modal" id="addNewFolderModal">
        <div className="ui icon header">
          <i className="folder icon"></i>
          Add a new Folder
        </div>
        <div className="content">

          <form className="ui form" id="addfolderform">
            <div className="field">
              <input type="text" name="foldername"  placeholder='Folder Name...' onChange={this.inputChange} value={this.props.foldername} />
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

export default connect(
  (state) => ({
    foldername: state.ui.foldername
  }),
  (dispatch) => ({
    handleAddFoldername: (foldername) => {
      dispatch(addFoldername(foldername))
    }
  })
)(AddNewFolderModal)