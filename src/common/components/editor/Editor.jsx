import React from 'react'
import EditorContent from './EditorContent.jsx'
import { browserHistory, Link } from 'react-router'

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
        //console.log(this.props)
        if(!this.props.isFetching) this.props.handleEditorGetFiles(this.props.sessionid, this.props.params.fileid)
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
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
        // console.log("unmount")
    }
    render() {
        return (
            <div>
                {this.props.isFetching || !this.props.openedFiles.find(file => (file.id === this.props.params.fileid)) ? <Loader /> :
                <div>
                    <div className="ui top attached tabular menu">
                        {this.props.openedFiles.map(file => {
                            if(file.id === this.props.params.fileid) return ( <a key={file.id} className="item active">{file.name}</a> )
                            else return ( <a key={file.id} className="item">{file.name}</a> )
                        })}
                    </div>
                    <EditorContent sessionid={this.props.sessionid} file={this.props.openedFiles.find(file => (file.id === this.props.params.fileid))} />
                </div>
                }
            </div>
        )
    }
}

export default Editor