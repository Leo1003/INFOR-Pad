import React from 'react'
import { List } from 'semantic-ui-react'

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
        <h1>{this.props.folder.name}</h1>
        <List divided relaxed>
          {this.props.folder.files.map(file => {
              if(file.format === 'Directory') return (
                <List.Item key={file.id}>
                  <List.Icon name='folder' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a' href={file.id}>{file.name}</List.Header>
                    <List.Description as='a'>Last Updated: {file.modifyDate}</List.Description>
                  </List.Content>
                </List.Item>
          )})}
        </List>
        <hr />
        <List divided relaxed>
          {this.props.folder.files.map(file => {
              if(file.format !== 'Directory') return (
                <List.Item key={file.id}>
                  <List.Icon name='file' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>{file.name}</List.Header>
                    <List.Description as='a'>Last Updated: {file.modifyDate}</List.Description>
                  </List.Content>
                </List.Item>
          )})}
        </List>
      </div>
    )
  }
}

export default FolderContent
