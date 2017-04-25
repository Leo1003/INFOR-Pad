import React from 'react'
import { Container } from 'semantic-ui-react'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <Container>
        <h1>{this.props.name} User Page</h1>
      </Container>
    )
  }
}

export default UserPage
