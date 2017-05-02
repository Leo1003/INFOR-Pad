import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class AddNewFiles extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddNewFolder = this.handleAddNewFolder.bind(this)
  }
  handleAddNewFolder(e, data) {
    console.log("addnewfolder")
    console.log(data)
  }
  render() {
    return (
      <Dropdown button text='New' basic>
        <Dropdown.Menu>
          <Dropdown.Item icon='folder' text='New Folder' onClick={this.handleAddNewFolder} />
          <Dropdown.Item icon='file' text='New File' />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default AddNewFiles
