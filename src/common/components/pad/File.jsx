import React from 'react'

class File extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    if(!this.props.isFetching) this.props.handleGetFiles(this.props.sessionid, this.props.params.fileid)
  }
  componentWillReceiveProps(nextProps) {
    // if(!nextProps.isFetching && nextProps.cur_file.name.length == 0) {
    //   this.props.handleGetFiles(nextProps.sessionid, this.props.params.folderid)
    // }
    // else if(!nextProps.isFetching && (nextProps.params.fileid !== this.props.cur_folder.id)) {
    //   this.props.handleGetFiles(nextProps.sessionid, nextProps.params.folderid)
    // }
  }
  render() {
    console.log(this.props)
    return(
      <h1>This is a File</h1>
    )
  }
}

export default File
