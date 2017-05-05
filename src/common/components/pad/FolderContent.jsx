import React from 'react'
import AddNewFiles from './AddNewFiles.jsx'
import FolderDropdown from './FolderDropdown.jsx'
import { List, Dropdown } from 'semantic-ui-react'
import { browserHistory, Link } from 'react-router'

const moment = require('moment')

class FolderContent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log("call dropdown")
    $('.ui.dropdown').dropdown()
  }
  componentWillReceiveProps() {
    $('.ui.dropdown').dropdown()
  }
  componentDidUpdate() {
    $('.ui.dropdown').dropdown()
  }
  render() {

    return (
      <div>
        <h2>{this.props.folder.name}</h2>
        <AddNewFiles id={this.props.folder.id} sessionid={this.props.sessionid} handleAddNewFolder={this.props.handleAddNewFolder} />
        <table className="ui celled unstackable selectable table">
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
                  <Link to={'/pad/folder/' + this.props.folder.parent}>..</Link>
                </td>
              </tr>
            ) : null}
            {this.props.folder.files.map(file => {
              if(file.format === 'Directory')
                return (
                  <tr key={file.id}>
                    <td className='collapsing'>
                      <i className="folder icon"></i>
                      <Link to={'/pad/folder/' + file.id }>{file.name}</Link>
                    </td>
                    <td>
                      Size
                    </td>
                    <td className="right aligned collapsing">
                      {moment(file.modifyDate).fromNow()}
                    </td>
                    <td className="right aligned collapsing">
                      <FolderDropdown id={file.id} sessionid={this.props.sessionid} folderid={this.props.folder.id}/>
                    </td>
                  </tr>
                )
              })}

            {this.props.folder.files.map(file => {
              if(file.format !== 'Directory')
                return (
                <tr key={file.id}>
                  <td className='collapsing'>
                    <i className="file outline icon"></i>
                    <Link to={'file/' + file.id + '/view'}>{file.name}</Link>
                  </td>
                  <td>
                    Size
                  </td>
                  <td className="right aligned collapsing">
                    {moment(file.modifyDate).fromNow()}
                  </td>
                  <td className="right aligned collapsing">
                    <FolderDropdown id={file.id} sessionid={this.props.sessionid} folderid={this.props.folder.id}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default FolderContent
