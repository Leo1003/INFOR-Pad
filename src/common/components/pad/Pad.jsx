import React from 'react'

class Pad extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <h1>Hello</h1>
        <p>Todo: edit rename delete button......</p>
        {this.props.children}
      </div>
    )
  }
}

export default Pad
