import React from 'react'
import { fetchDeleteFile } from '../../actions/filesActions'
import { connect } from 'react-redux'

class FolderDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.handleActions = this.handleActions.bind(this)
    this.renameModal = this.renameModal.bind(this)
  }
  componentDidMount() {
    $('#renameform').form({
      fields: {
        rename: {
          identifier: 'rename',
          rules: [
            {
              type: 'empty',
              prompt: 'Please Enter a Name'
            }
          ]
        }
      },
      inline: true,
      onFailure: false,
      onSuccess: this.handleRename.bind(this)
    })
  }
  renameModal() {
    $('#renameModal').modal({
      blurring: true,
      onDeny: () => {
        $('#renameform').form('clear')
      }
      }).modal('show')
  }
  handleRename(e) {
    e.preventDefault()
    const formData = {}
    for(const field in this.refs) {
      formData[field] = this.refs[field].value
    }
    $('#renameform').form('clear')
    $('#renameModal').modal('hide')
    //this.props.handleRename(formData['rename'], this.props.id, this.props.sessionid)  //(filename, folderid, sessionid)
  }
  handleActions(e) {
    let selected = $(`#${this.props.id}`).dropdown('get value')
    if(selected === "delete") {
      this.props.handleDelete(this.props.id, this.props.sessionid, this.props.folderid)
    } else if(selected === "rename") {
      this.renameModal()
    }
  }
  render() {
    return (
      <div>
        <div className="ui dropdown compact" id={this.props.id}>
          <div className="text"></div>
          <i className="dropdown icon"></i>
          <div className="menu">
            <div className="item" data-value='public'><i className='add user icon'></i>Public</div>
            <div className="item" data-value='share'><i className='external share icon'></i>shareid</div>
            <div className="item" data-value='open_editor'><i className='file code outline icon'></i>Open with Editor</div>
            <div className="divider"></div>
            <div className="item" data-value='rename'><i className='edit icon'></i>Rename</div>
            <div className="item" data-value='move'><i className='level up icon'></i>Move</div>
            <div className="item" data-value='delete' onClick={this.handleActions}><i className='remove icon'></i>Delete</div>
          </div>
        </div>

        <div className="ui small modal" id="renameModal">
          <div className="ui icon header">
            <i className="edit icon"></i>
            Enter new name
          </div>
          <div className="content">

            <form className="ui form" id="renameform">
              <div className="field">
                <input type="text" name="rename" ref='rename' placeholder='new name...' />
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
              Rename
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  handleDelete: (fsid, sessionid, folderid) => {
    dispatch(fetchDeleteFile(fsid, sessionid, folderid))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderDropdown)
