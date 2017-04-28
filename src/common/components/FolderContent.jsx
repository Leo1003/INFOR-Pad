import React from 'react'

class FolderContent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log("folderContent")
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <h1>Folder Content</h1>
      </div>
    )
  }
}

export default FolderContent
