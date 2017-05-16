import React from 'react'
import EditorContent from './EditorContent.jsx'
import { browserHistory } from 'react-router'

const Loader = () => (
  <div className="ui active inverted dimmer">
      <div className="ui text loader">Loading</div>
  </div>
)

class Editor extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.props.initialRedirect()
        if(!this.props.isFetching) this.props.handleGetFiles(this.props.sessionid, this.props.params.fileid, 'File')
    }
    componentWillReceiveProps(nextProps) {
        if(!nextProps.isFetching && nextProps.cur_file.id.length == 0) {
            this.props.handleGetFiles(nextProps.sessionid, this.props.params.fileid, 'File')
        }
        else if(!nextProps.isFetching && (nextProps.params.fileid !== this.props.cur_file.id)) {
            this.props.handleGetFiles(nextProps.sessionid, nextProps.params.fileid, 'File')
        }
        if(!nextProps.isFetching && nextProps.redirectToError) browserHistory.replace({pathname: '/error'})
    }
    render() {
        return (
            <div>
                {this.props.isFetching ? <Loader /> : <EditorContent sessionid={this.props.sessionid} file={this.props.cur_file} />}
            </div>
        )
    }
}

export default Editor