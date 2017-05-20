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
            { this.props.lang == 'en' ? 'Add a new File' : 'إضافة ملف جديد' }
          </div>
          <div className="content">

            <form className="ui form" id="addfileform">
              <div className="field">
                <input type="text" name="filename" ref='filename' placeholder={this.props.lang == 'en' ? 'File Name...' : 'اسم الملف...'}/>
              </div>
              <div className="field">
                <select className="ui dropdown" ref="language" name="language">
                  <option value="">{this.props.lang == 'en' ? 'Language' : 'لغة'}</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="markdown">Markdown</option>
                  <option value="C">C</option>
                  <option value="CPP">C++</option>
                  <option value="CPP11">C++11</option>
                  <option value="CPP14">C++14</option>
                  <option value="Python2">Python 2</option>
                  <option value="Python3">Python 3</option>
                  <option value="Bash">Bash</option>
                  <option value="Plain_text">Plain Text</option>
                </select>
              </div>
            </form>

          </div>
          <div className="actions">
            <div className="ui basic cancel button">
              <i className="remove icon"></i>
              { this.props.lang == 'en' ? 'Cancel' : 'إلغاء' }
            </div>
            <button className="ui blue button" type="submit" form='addfileform'>
              <i className="checkmark icon"></i>
              { this.props.lang == 'en' ? 'Add' : 'إضافة' }
            </button>
          </div>
        </div>
    )
  }
}
