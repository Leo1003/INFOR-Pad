import React from 'react'
import { List, Link } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

class FolderContent extends React.Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }
  componentDidMount() {
    console.log("folderContent")
    console.log(this.props)
  }
  goBack() {
    browserHistory.goBack()
    return
  }
  render() {
    return (
      <div>
        <h2>{this.props.folder.name}</h2>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th colSpan="3">
                Data:
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.folder.parent.length > 0 ? (
              <tr className='collapsing'>
                <td>
                  <a href="" onClick={this.goBack}>..</a>
                </td>
              </tr>
            ) : null}
            {this.props.folder.files.map(file => (
              <tr key={file.id}>
                <td className='collapsing'>
                  { file.format === 'Directory' ? (<i className="folder icon"></i>) : ( <i className="file outline icon"></i>) }
                  { file.format === 'Directory' ? (<a href={'/pad/folder/' + file.id }>{file.name}</a>) : (<a href={'file/' + file.id + '/view'}>{file.name}</a>)}
                </td>
                <td>
                  Size
                </td>
                <td className="right aligned collapsing">
                  {file.modifyDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default FolderContent
