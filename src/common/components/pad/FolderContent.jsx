import React from 'react'
import AddNewFilesDropdown from './AddNewFilesDropdown.jsx'
import FolderModal from './FolderModal.jsx'
import { List, Dropdown } from 'semantic-ui-react'
import { browserHistory, Link } from 'react-router'

const moment = require('moment')

class FolderContent extends React.Component {
  constructor(props) {
    super(props)
    this.showAll = this.showAll.bind(this)
    this.showPublic = this.showPublic.bind(this)
    this.showPrivate = this.showPrivate.bind(this)
    this.state = {
      show: 'All'
    }
  }
  componentDidMount() {
    $('.ui.dropdown').dropdown()
  }
  componentWillReceiveProps() {
    $('.ui.dropdown').dropdown()
  }
  showAll() {
    this.setState({
      show: 'All'
    })
  }
  showPublic() {
    this.setState({
      show: 'Public'
    })
  }
  showPrivate() {
    this.setState({
      show: 'Private'
    })
  }
  render() {
    return (
      <div>
        <h2>{this.props.folder.name}</h2>
        {this.props.userid === this.props.folder.owner.id ? <AddNewFilesDropdown id={this.props.folder.id} /> : null }
        <div className="ui icon buttons">
          <button className="tiny ui basic button" onClick={this.showAll}>
            <i className="asterisk icon"></i>
            All
          </button>
          <button className="tiny ui basic button" onClick={this.showPublic}>
            <i className="world icon"></i>
            Public
          </button>
          <button className="tiny ui basic button" onClick={this.showPrivate}>
            <i className="lock icon"></i>
            Private
          </button>
        </div>
        <table className="ui overflow fixed single line celled unstackable selectable table">
          <thead>
            <tr>
              <th>FileName</th>
              <th style={{width: '30%'}}>Type</th>
              <th style={{width: '30%'}}>ModifyDate</th>
              <th style={{width: '44px'}}></th>
            </tr>
          </thead>
          <tbody>
            {(this.props.folder.parent.id.length > 0 && this.props.folder.id !== this.props.folder.parent.id)? (
              <tr className='collapsing'>
                <td>
                  <i className="level up icon"></i>
                  <Link to={'/pad/folder/' + this.props.folder.parent.id}>..</Link>
                </td>
              </tr>
            ) : null}
            {this.props.folder.files.map(file => {
              if(file.format === 'Directory' && (this.state.show === 'All' || (this.state.show === 'Public' && file.isPublic) || (this.state.show === 'Private' && !file.isPublic)))
                return (
                  <tr key={file.id}>
                    <td className='collapsing'>
                      <i className="folder icon"></i>
                      <Link to={'/pad/folder/' + file.id }>{file.name}</Link>
                    </td>
                    <td>
                      {file.format}
                    </td>
                    <td>
                      {moment(file.modifyDate).fromNow()}
                    </td>
                    <td className="right aligned collapsing">
                      <FolderModal file={file} sessionid={this.props.sessionid} foldername={this.props.folder.name} folderid={this.props.folder.id} owner={this.props.folder.owner} />
                    </td>
                  </tr>
                )
              })}

            {this.props.folder.files.map(file => {
              if(file.format !== 'Directory' && (this.state.show === 'All' || (this.state.show === 'Public' && file.isPublic) || (this.state.show === 'Private' && !file.isPublic)))
                return (
                <tr key={file.id}>
                  <td className='collapsing'>
                    <i className="file outline icon"></i>
                    <Link to={'/pad/file/' + file.id }><span>{file.name}</span></Link>
                  </td>
                  <td>
                    {file.format}
                  </td>
                  <td>
                    {moment(file.modifyDate).fromNow()}
                  </td>
                  <td className="right aligned collapsing">
                    <FolderModal file={file} sessionid={this.props.sessionid} foldername={this.props.folder.name} folderid={this.props.folder.id} owner={this.props.folder.owner} />
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
