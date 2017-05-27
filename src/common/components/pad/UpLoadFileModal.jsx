import React from 'react'
import { connect } from 'react-redux'

class UpLoadFileModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleUploadfile = this.handleUploadfile.bind(this)
        this.checkSubfilename = this.checkSubfilename.bind(this)
        this.mapLanguageToCompiler = {
            "cpp": "CPP14",
            "py": "Python3",
            "java": "Java",
            "jsx": "JSX",
            "html": "HTML",
            "xml": "XML",
            "css": "CSS",
            "styl": "Stylus",
            "scss": "Scss",
            "less": "Less",
            "js": "Javascript",
            "json": "JSON",
            "swift": "Swift",
            "m": "ObjectiveC",
            "php": "PHP",
            "hs": "Haskell",
            "md": "Markdown",
            "sh": "Bash",
            "txt": "Plain_Text"
        }
        this.state = {
            error: '',
        }
    }
    checkSubfilename(filename) {
        let dot = -1
        for (let i = filename.length - 1; i >= 0; i--) if (filename[i] == '.') {
            dot = i;
            break
        }
        if (dot == -1) return ""
        let subfilename = filename.substring(dot + 1, filename.length)
        // for (let i of Object.keys(this.mapLanguageToCompiler)) console.log(i)
        if (Object.keys(this.mapLanguageToCompiler).indexOf(subfilename) != -1) return this.mapLanguageToCompiler[subfilename]
        return ""
    }
    handleUploadfile(e) {
        e.preventDefault()
        // console.log(this.refs.uploadfile.files[0])
        let fr = new FileReader()
        if(this.refs.uploadfile.files[0] == undefined) {
            this.setState({ error: 'Please Choose a File'})
        } else if(this.checkSubfilename(this.refs.uploadfile.files[0].name).length < 1) {
            this.setState({ error: 'Not a Valid File Type'})
        } else {
            this.setState({ error: '' })
            fr.readAsText(this.refs.uploadfile.files[0])
        }
        fr.onload = event => {
            // console.log("load finished")
            // console.log(event.target.result)
            this.props.handleUpLoadFiles(this.refs.uploadfile.files[0].name, this.props.id, this.props.sessionid, this.checkSubfilename(this.refs.uploadfile.files[0].name), this.refs.description.value ,event.target.result)
            $('#uploadform').form('clear')
            $('#uploadFileModal').modal('hide')
        }
    }
    componentWillUnmount() {
        $('#uploadFileModal').remove()
        $('#uploadform').remove()
    }
    render(){
        return (
            <div className="ui small modal" id="uploadFileModal">
                <div className="ui icon header">
                    <i className="upload icon"></i>
                    Upload a New File
                </div>
                <div className="content">
                    <form className="ui form error" id="uploadform" onSubmit={this.handleUploadfile}>
                        <div className="field">
                            <input type="file" name="uploadfile" id="uploadfile" ref="uploadfile"/>
                        </div>
                        <div className="field">
                            <textarea rows="2" placeholder="Write some description" ref="description"></textarea>
                        </div>
                    { this.state.error.length > 0 ? <div className="ui error message">
                        <p>{this.state.error}</p>
                    </div> : null}
                    </form> 
                </div>
                <div className="actions">
                    <div className="ui basic cancel button">
                        <i className="remove icon"></i>
                        Cancel
                    </div>
                    <button className="ui blue button" type="submit" form='uploadform'>
                        <i className="checkmark icon"></i>
                        Upload
                    </button>
                </div>
            </div>
            
        )
    }
}

export default UpLoadFileModal