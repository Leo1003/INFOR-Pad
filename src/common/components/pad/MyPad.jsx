import React from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FolderContent from './FolderContent.jsx'

class MyPad extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    // console.log(this.props)
    if(!this.props.isFetching) this.props.handleGetFiles(this.props.sessionid, this.props.rootfsid)
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching && nextProps.cur_folder.name.length == 0) this.props.handleGetFiles(nextProps.sessionid, this.props.rootfsid)
  }
  render() {
    let renderContent = () => {
      if(this.props.cur_folder.name.length == 0) return (
        <h1> Loading... </h1>
      )
      else return (
        <div>
          <FolderContent folder={this.props.cur_folder} />
        </div>
      )
    }
    return (
      <Container>
        {renderContent()}
      </Container>
    )
  }
}

export default MyPad
