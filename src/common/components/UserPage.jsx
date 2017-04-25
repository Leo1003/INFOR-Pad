import React from 'react'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <h1>{this.props.name} User Page</h1>
    )
  }
}

export default UserPage
