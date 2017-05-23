import React from 'react'
import AddNewFilesDropdown from './AddNewFilesDropdown.jsx'
import FolderModal from './FolderModal.jsx'
import { List, Dropdown } from 'semantic-ui-react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import { changeFolderModal } from '../../actions/filesActions'

const moment = require('moment')

class FolderContent extends React.Component {
  constructor(props) {
    super(props)
    this.showAll = this.showAll.bind(this)
    this.showPublic = this.showPublic.bind(this)
    this.showPrivate = this.showPrivate.bind(this)
    this.openModal = this.openModal.bind(this)
    this.state = {
      show: 'All',
    }
  }
  componentDidMount() {
    $('.ui.dropdown').dropdown()
  }
  componentWillReceiveProps() {
    $('.ui.dropdown').dropdown()
  }
  openModal(file) {
    this.props.handleChangeFolderModal(file)
    $('.main.modal').modal('show')
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
  componentWillReceiveProps(nextProps) {
    console.log("folder content receive")
    // console.log(this.props)
    // console.log(nextProps)
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
        <table className="ui overflow fixed single line celled selectable table">
          <thead>
            <tr>
              <th>FileName</th>
              <th style={{width: '24%'}}>Type</th>
              <th style={{width: '40%'}}>Description</th>
              <th style={{width: '44px'}}></th>
            </tr>
          </thead>
          <tbody>
            {this.props.folder.parent.id ? (
              <tr className='collapsing'>
                <td>
                  <Link to={'/pad/folder/' + this.props.folder.parent.id}><i className="large level up icon"></i></Link>
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
                      {file.description}
                    </td>
                    <td className="right aligned collapsing">
                      {/*<FolderModal file={file} sessionid={this.props.sessionid} foldername={this.props.folder.name} folderid={this.props.folder.id} owner={this.props.folder.owner} />*/}
                      <i className="archive large link icon" onClick={() => this.openModal(file)}></i>
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
                    {file.description}
                  </td>
                  <td className="right aligned collapsing">
                    {/*<FolderModal file={file} sessionid={this.props.sessionid} foldername={this.props.folder.name} folderid={this.props.folder.id} owner={this.props.folder.owner} />*/}
                    <i className="archive large link icon" onClick={() => this.openModal(file)} ></i>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
          <FolderModal file={this.props.openedModal} sessionid={this.props.sessionid} folder={this.props.folder} owner={this.props.folder.owner} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  openedModal: state.ui.openedModal
})

const mapDispatchToProps = (dispatch) => ({
  handleChangeFolderModal: (file) => {
    dispatch(changeFolderModal(file))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderContent)

