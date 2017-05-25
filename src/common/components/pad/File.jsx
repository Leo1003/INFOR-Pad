import React from 'react'
import FileContent from './FileContent.jsx'
import { browserHistory } from 'react-router'

class File extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.initialRedirect()
    if(!this.props.isFetching) this.props.handleGetFiles(this.props.sessionid, this.props.params.fileid, 'File')
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching && nextProps.cur_file.id.length == 0) {
      this.props.handleGetFiles(nextProps.sessionid, this.props.params.fileid, 'File')
    }
    else if(!nextProps.isFetching && (nextProps.params.fileid !== this.props.cur_file.id)) {
      this.props.handleGetFiles(nextProps.sessionid, nextProps.params.fileid, 'File')
    }
    if(!nextProps.isFetching && nextProps.redirectToError) browserHistory.replace({pathname: '/error'})
  }
  render() {
    let renderContent = () => {
      if(this.props.isFetching) return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      )
      else {
        console.log(this.props)
        return (
        <div>
          <FileContent userid={this.props.user.id} userSettings={this.props.user.settings} file={this.props.cur_file} sessionid={this.props.sessionid} />
        </div>
      )}
    }
    return(
      <div>
        {renderContent()}
      </div>
    )
  }
}

export default File
