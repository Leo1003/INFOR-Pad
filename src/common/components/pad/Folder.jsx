import React from 'react'

class Folder extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div>Folder</div>
    )
  }
}

export default Folder
