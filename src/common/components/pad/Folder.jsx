import React from 'react'
import FolderContent from './FolderContent.jsx'

class Folder extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    if(!this.props.isFetching) this.props.handleGetFiles(this.props.sessionid, this.props.params.folderid)
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching && nextProps.cur_folder.name.length == 0) {
      this.props.handleGetFiles(nextProps.sessionid, this.props.params.folderid)
    }
    else if(!nextProps.isFetching && (nextProps.params.folderid !== this.props.cur_folder.id)) {
      this.props.handleGetFiles(nextProps.sessionid, nextProps.params.folderid)
    }
  }
  render() {
    let renderContent = () => {
      if(this.props.cur_folder.name.length == 0) return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      )
      else return (
        <div>
          <FolderContent folder={this.props.cur_folder} sessionid={this.props.sessionid} handleAddNewFolder={this.props.handleAddNewFolder} handleGetFiles={this.props.handleGetFiles}/>
        </div>
      )
    }
    return (
      <div>
        {renderContent()}
      </div>
    )
  }
}

export default Folder
