import React from 'react'
import AddNewFiles from './AddNewFiles.jsx'
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
    let ContentDropDown = () => (
      <div className="ui dropdown button basic">
        <div className="text"></div>
        <i className="dropdown icon"></i>
        <div className="menu">
          <div className="item"><i className='add user icon'></i>Public</div>
          <div className="item"><i className='external share icon'></i>shareid</div>
          <div className="item"><i className='file code outline icon'></i>Open with Editor</div>
          <div className="divider"></div>
          <div className="item"><i className='edit icon'></i>Rename</div>
          <div className="item"><i className='level up icon'></i>Move</div>
          <div className="item"><i className='remove icon'></i>Delete</div>
        </div>
      </div>
    )
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
                      {ContentDropDown()}
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
                    {ContentDropDown()}
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
