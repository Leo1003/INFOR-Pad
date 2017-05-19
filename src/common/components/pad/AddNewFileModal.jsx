import React from 'react'

export class AddNewFileModal extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.formValidation()
    $('.ui.dropdown').dropdown()
  }
  componentDidUpdate() {
    this.formValidation()
    $('.ui.dropdown').dropdown()
  }
  formValidation() {
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
        },
        language: {
          identifier : 'language',
          rules: [
            {
              type: 'empty',
              prompt: 'Please select a language'
            }
          ]
        }
      },
      inline: true,
      onFailure: this.handleFileInvalid.bind(this),
      onSuccess: this.handleAddNewFile.bind(this)
    })
  }
  handleAddNewFile(e) {
    e.preventDefault()
    this.props.handleAddNewFiles(this.refs.filename.value, this.props.id, this.props.sessionid, this.refs.language.value)
    $('#addfileform').form('reset')
    $('#addNewFileModal').modal('hide')
    this.props.handlefetchGetFiles(this.props.sessionid, this.props.id, 'Directory')
  }
  handleFileInvalid(e) {
    return false
  }
  render() {
    return (
      <div className="ui small modal" id="addNewFileModal">
          <div className="ui icon header">
            <i className="file icon"></i>
            Add a new File
          </div>
          <div className="content">

            <form className="ui form" id="addfileform">
              <div className="field">
                <input type="text" name="filename" ref='filename' placeholder='File Name...' />
              </div>
              <div className="field">
                <select className="ui search dropdown" ref="language" name="language">
                      <option value="">Language</option>
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
    )
  }
}
