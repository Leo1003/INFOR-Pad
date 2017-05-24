import React from 'react'
import { Container } from 'semantic-ui-react'

class Pad extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}

export default Pad
