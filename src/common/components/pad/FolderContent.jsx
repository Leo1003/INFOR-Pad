import React from 'react'
import AddNewFiles from './AddNewFiles.jsx'
import { List, Dropdown } from 'semantic-ui-react'
import { browserHistory, Link } from 'react-router'

const moment = require('moment')

class FolderContent extends React.Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }
  componentDidMount() {
    console.log("folderContent")
    console.log(this.props)
  }
  goBack() {
    browserHistory.goBack()
    return
  }
  render() {
    return (
      <div>
        <h2>{this.props.folder.name}</h2>
        <AddNewFiles id={this.props.folder.id} />
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th colSpan="4">
                Data:
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.folder.parent.length > 0 ? (
              <tr className='collapsing'>
                <td>
                  <a href="" onClick={this.goBack}>..</a>
                </td>
              </tr>
            ) : null}
            {this.props.folder.files.map(file => (
              <tr key={file.id}>
                <td className='collapsing'>
                  { file.format === 'Directory' ? (<i className="folder icon"></i>) : ( <i className="file outline icon"></i>) }
                  { file.format === 'Directory' ? (<Link to={'/pad/folder/' + file.id }>{file.name}</Link>) : (<Link to={'file/' + file.id + '/view'}>{file.name}</Link>)}
                </td>
                <td>
                  Size
                </td>
                <td className="right aligned collapsing">
                  {moment(file.modifyDate).fromNow()}
                </td>
                <td className="right aligned collapsing">
                  <Dropdown>
                    <Dropdown.Menu>
                      <Dropdown.Item icon='add user' text='Public' />
                      <Dropdown.Item icon='external share' text='shareid' />
                      <Dropdown.Item icon='file code outline' text='Open with Editor' />
                      <Dropdown.Divider />
                      <Dropdown.Item icon='edit' text='Rename' />
                      <Dropdown.Item icon='level up' text='Move to...' />
                      <Dropdown.Item icon='remove' text='Delete' />
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default FolderContent
