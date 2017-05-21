import React from 'react'
import { connect } from 'react-redux'
import { fetchMoveContent, fetchMoveFile } from '../../actions/filesActions'

class MoveFileModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeContent = this.handleChangeContent.bind(this)
        this.handleMoveFile = this.handleMoveFile.bind(this)
    }
    handleChangeContent(fsid) {
        console.log(fsid)
        this.props.handleMoveContent(this.props.sessionid, fsid)
    }
    handleMoveFile() {
        console.log("handle move file")
        console.log(this.props.file.id)
        console.log(this.props.moveContent.id)
        $(`#${this.props.file.id}_moveModal`).modal('hide', this.props.handleMoveFile(this.props.sessionid, this.props.file.id, this.props.moveContent.id, this.props.folder.id))

    }
    componentWillMount() {
        console.log("willmount")
    }
    componentDidMount() {
        console.log("did mount")
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps) {
        console.log("receive props")
        console.log(this.props)
        console.log(nextProps)
        if(this.props.file.id !== nextProps.file.id) {
            this.props.handleMoveContent(this.props.sessionid, nextProps.folder.id)
        }
    }
    render() {
        return (
            <div className="ui modal" id={this.props.file.id + '_moveModal'} style={{height: "60vh", overflow:'hidden'}}>
                <div className="header">
                    {this.props.moveContent.name}
                </div>
                <div className="content" style={{height: "44vh", overflow: 'auto'}}>
                    <div className="ui selection list">
                        <div className="item" onClick={() => this.handleChangeContent(this.props.moveContent.parentId)}>
                            <i className="level up large icon"></i>
                        </div>
                        {this.props.moveContent.files.map(file => {
                            if(file.format === "Directory" && file.id !== this.props.file.id) {
                                return (
                                    <div key={file.id} className="item" onClick={() => this.handleChangeContent(file.id)}>
                                        <i className="folder large icon"></i>
                                        <div className="content">
                                            {file.name}
                                        </div>
                                    </div>
                                )
                            }

                        })}
                    </div> 
                </div>
                <div className="actions">
                    <div className="ui basic deny button">
                    Cancel
                    </div>
                    <button className="ui blue button" onClick={this.handleMoveFile}>Move</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    moveContent: state.ui.moveContent,
    sessionid: state.session.sessionid
})

const mapDispatchToProps = (dispatch) => ({
    handleMoveContent: (sessionid, fsid) => {
        dispatch(fetchMoveContent(sessionid, fsid))
    },
    handleMoveFile: (sessionid, fsid, tfsid, folderid) => {
        dispatch(fetchMoveFile(sessionid, fsid, tfsid, folderid))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MoveFileModal)