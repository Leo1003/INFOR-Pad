import React from 'react'
import FolderContent from './FolderContent.jsx'

const Loader = () => (
  <div className="ui active inverted dimmer">
      <div className="ui text loader">Loading</div>
  </div>
)

class MyPad extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    if(!this.props.isFetching) this.props.handleGetFiles(this.props.sessionid, this.props.rootfsid, "Directory")
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching && nextProps.cur_folder.id.length == 0) this.props.handleGetFiles(nextProps.sessionid, this.props.rootfsid, "Directory")
  }
  render() {
    return (
      <div>
        <div>
          {this.props.isFetching ? <Loader /> : null}
          <FolderContent userid={this.props.userid} folder={this.props.cur_folder} sessionid={this.props.sessionid} />
        </div>
      </div>
    )
  }
}

export default MyPad
