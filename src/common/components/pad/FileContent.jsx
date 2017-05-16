import React from 'react'
import { Link } from 'react-router'
const moment = require('moment')
const Highlight = require('react-highlight');

class FileContent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>{this.props.file.name}</h1>
        <div className="content">
          <p><b>Type: </b>&nbsp;{this.props.file.format}</p>
          <p><b>Owner: </b>&nbsp;<a href={'/user/' + this.props.file.owner.name}>{this.props.file.owner.name}</a></p>
          <p><b>Location: </b>&nbsp;{this.props.file.parent.name}</p>
          <p><b>CreateDate: </b>&nbsp;{moment(this.props.file.createDate).subtract(10, 'days').calendar()}</p>
          <p><b>Last Modify: </b>&nbsp;{moment(this.props.file.modifyDate).subtract(10, 'days').calendar()}</p>
          {this.props.file.isPublic ? <p><b>Share ID:</b>&nbsp;<a href={'/' + this.props.file.shortid }>{this.props.file.shortid}</a></p> : null}
          <hr />
          <p><b>Code:</b></p>
          { this.props.userid === this.props.file.owner.id ? <Link to={'/editor/' + this.props.file.id }>Open with Editor</Link> : null }
          {this.props.file.code.length > 0 ?
          <Highlight className='cpp'>
            {this.props.file.code}
          </Highlight> : null }
          <br />
        </div>
      </div>
    )
  }
}

export default FileContent
