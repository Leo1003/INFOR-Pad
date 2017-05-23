import React from 'react'
import EditorContent from './EditorContent.jsx'
import { browserHistory, Link } from 'react-router'

// import io from 'socket.io-client'
// let socket = undefined

const Loader = () => (
  <div className="ui active inverted dimmer">
      <div className="ui text loader">Loading</div>
  </div>
)

class Editor extends React.Component {
    constructor(props) {
        super(props)
    }
    // onResult(callback) {
    //     socket.on('Result', data => {
    //         let result = {};
    //         result.id = data.id;
    //         if (data.type == 2) {
    //             result.status = 'Error';
    //         } else if (data.type == 1) {
    //             result.status = 'ComplieError';
    //         } else if (data.type == 0) {
    //             result.status = 'Success';
    //         }
    //         result.time = data.time != -1 ? data.time : undefined;
    //         result.memory = data.memory != -1 ? data.memory : undefined;
    //         result.exitcode = data.exitcode;
    //         result.signal = data.signal;
    //         result.killed = data.killed;
    //         result.stdout = data.output;
    //         result.stderr = data.error;
    //         return callback(result);
    //     });
    // }
    componentWillMount() {
        this.props.initialRedirect()
        //console.log(this.props)
        if(!this.props.isFetching) this.props.handleEditorGetFiles(this.props.sessionid, this.props.params.fileid)
    }
    componentDidMount() {
        // socket = io('/client', {query: `sessionid=${this.props.sessionid}`})
        // socket.on('connect', () => {

        //     console.log("Connected to server!")
        //     //callback()
        // })
        // socket.on('error', error => {
        //     console.error(error)
        //     //callback(error)
        // })
        // console.log(socket)
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
        console.log("render")
        console.log(this.props.isFetching.toString())
        console.log(this.props.openedFiles)
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