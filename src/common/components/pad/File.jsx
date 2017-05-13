import React from 'react'

class File extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    if(!this.props.isFetching) this.props.handleGetFiles(this.props.sessionid, this.props.params.fileid, 'File')
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching && nextProps.cur_file.id.length == 0) {
      this.props.handleGetFiles(nextProps.sessionid, this.props.params.fileid, 'File')
    }
    else if(!nextProps.isFetching && (nextProps.params.fileid !== this.props.cur_folder.id)) {
      this.props.handleGetFiles(nextProps.sessionid, nextProps.params.fileid, 'File')
    }
  }
  render() {
    console.log(this.props)
    return(
      <h1>This is a File</h1>
    )
  }
}

export default File
