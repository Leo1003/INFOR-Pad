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
        console.log(this.props)
        if(!this.props.isFetching) this.props.handleEditorGetFiles(this.props.sessionid, this.props.params.fileid)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let findId = false;
        this.props.openedFiles.map(file => {
            if(!findId && file.id === this.props.params.fileid) findId = true;
        })
        if(!nextProps.isFetching && !findId) {
            this.props.handleEditorGetFiles(nextProps.sessionid, this.props.params.fileid)
        }
        if(!nextProps.isFetching && nextProps.redirectToError) browserHistory.replace({pathname: '/error'})
    }
    componentWillUnMount() {
        console.log("unmount")
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