import React from 'react'
import FolderContent from './FolderContent.jsx'
import { browserHistory } from 'react-router'

const Loader = () => (
  <div className="ui active inverted dimmer">
      <div className="ui text loader">Loading</div>
  </div>
)

class Folder extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.initialRedirect()
    if(!this.props.isFetching) this.props.handleGetFiles(this.props.sessionid, this.props.params.folderid, "Directory")
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching && (nextProps.params.folderid !== this.props.cur_folder.id)) {
      this.props.handleGetFiles(nextProps.sessionid, nextProps.params.folderid, "Directory")
    }
    if(!nextProps.isFetching && nextProps.redirectToError) browserHistory.push({pathname: '/error'})
  }
  render() {
    return (
      <div>
        {(this.props.isFetching || this.props.params.folderid !== this.props.cur_folder.id) ? <Loader /> :
        <FolderContent userid={this.props.userid} folder={this.props.cur_folder} sessionid={this.props.sessionid} />
        }
      </div>
    )
  }
}

export default Folder
