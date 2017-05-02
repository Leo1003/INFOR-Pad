import React from 'react'
import { Dropdown, Modal, Header, Button, Icon } from 'semantic-ui-react'

class AddNewFiles extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddNewFolder = this.handleAddNewFolder.bind(this)
  }
  handleAddNewFolder(e, data) {
    console.log("addnewfolder")
    console.log(data)
  }
  componentDidMount() {
  }
  render() {
    return (
      <Dropdown button text='New' basic>
        <Dropdown.Menu>
          <Modal dimmer='blurring' trigger={<Dropdown.Item icon='folder' text='New Folder' />} size='small'>
            <Header icon='folder' content='Add a new folder' />
            <Modal.Content>
              <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='red'>
                <Icon name='remove' /> Cancel
              </Button>
              <Button basic color='green'>
                <Icon name='checkmark' /> Build
              </Button>
            </Modal.Actions>
          </Modal>

          <Dropdown.Item icon='file' text='New File' />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default AddNewFiles
