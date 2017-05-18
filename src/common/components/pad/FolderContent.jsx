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
        <table className="ui celled unstackable selectable table">
          <thead>
            <tr>
              <th colSpan="4">
                  <button className="tiny ui basic button" onClick={this.showAll}>All</button>
                  <button className="tiny ui basic button" onClick={this.showPublic}>Public</button>
                  <button className="tiny ui basic button" onClick={this.showPrivate}>Private</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {(this.props.folder.parent.id.length > 0 && this.props.folder.id !== this.props.folder.parent.id)? (
              <tr className='collapsing'>
                <td>
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
                      Size
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
                    Size
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
