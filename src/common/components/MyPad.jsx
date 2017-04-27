import React from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FolderContent from './FolderContent.jsx'

class MyPad extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
        <div>
          <h1>{this.props.name + "' "}s Pad</h1>
          <FolderContent fsid={this.props.fsid} />
        </div>
      </Container>
    )
  }
}

export default MyPad
