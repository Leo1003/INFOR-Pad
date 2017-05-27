import React from 'react'
import { connect } from 'react-redux'
import { fetchFastSubmit } from'../actions/filesActions'

const Editor = (props) => {
  if (typeof window !== 'undefined') {
    const AceEditor = require('react-ace').default
    require('brace/mode/c_cpp');     //CPP CPP11 CPP14
    require('brace/mode/jsx')        //JSX
    require('brace/mode/javascript') //Javascript
    require('brace/mode/csharp')     //C#
    require('brace/mode/css')        //CSS
    require('brace/mode/haskell')    //Haskell
    require('brace/mode/html')       //HTML
    require('brace/mode/java')       //Java
    require('brace/mode/json')       //JSON
    require('brace/mode/markdown')   //Markdown
    require('brace/mode/php')        //PHP
    require('brace/mode/objectivec') //ObjectiveC
    require('brace/mode/plain_text') //Plain_Text
    require('brace/mode/python')     //Python2 Python3
    require('brace/mode/swift')      //Swift
    require('brace/mode/stylus')     //Stylus
    require('brace/mode/scss')       //Scss
    require('brace/mode/less')       //Less
    require('brace/mode/xml')        //XML
    require('brace/mode/sh')

    require("brace/theme/tomorrow")
    require("brace/theme/tomorrow_night")
    return <AceEditor {...props}/>
  }
  return null;
}

class FastSubmit extends React.Component {
    constructor(props) {
        super(props)
        this.handleFilenameChange = this.handleFilenameChange.bind(this)
        this.checkSubfilename = this.checkSubfilename.bind(this)
        this.handleFiletypeChange = this.handleFiletypeChange.bind(this)
        this.changeCode = this.changeCode.bind(this)
        this.mapLanguageToCompiler = {
            "c": "C",
            "cpp": "CPP14",
            "py": "Python3",
            "java": "Java",
            "jsx": "JSX",
            "html": "HTML",
            "xml": "XML",
            "css": "CSS",
            "cs": "CSharp",
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
        this.mapCompilerToAce = {
            C: 'c_cpp',
            CPP: 'c_cpp',
            CPP11: 'c_cpp',
            CPP14: 'c_cpp',
            JSX: 'jsx',
            Javascript: 'javascript',
            CSharp: 'csharp',
            CSS: 'css',
            Haskell: 'haskell',
            HTML: 'html',
            Java: 'java',
            JSON: 'json',
            Markdown: 'markdown',
            PHP: 'php',
            ObjectiveC: 'opjectivec',
            Plain_Text: 'plain_text',
            Python2: 'python',
            Python3: 'python',
            Swift: 'swift',
            Stylus: 'stylus',
            Scss: 'scss',
            Less: 'less',
            XML: 'xml',
            Bash: 'sh'
        }
        this.state = {
            language: "",
            changedCode: "",
        }
    }
    componentDidMount() {
        this.formValidation()
        $('.ui.dropdown').dropdown()
    }
    componentDidUpdate() {
        this.formValidation()
        $('.ui.dropdown').dropdown()
    }
    formValidation() {
        $('#fastSubmitform').form({
        fields: {
            filename: {
            identifier: 'filename',
            rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter a File Name'
                    }
                ]
            },
            language: {
                identifier : 'language',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please select a language'
                    }
                ]
            }
        },
        inline: true,
        onFailure: this.handleFileInvalid.bind(this),
        onSuccess: this.handleFastSubmit.bind(this)
        })
    }
    componentWillUnmount() {
        $('#fastSubmitform').remove()
    }
    handleFastSubmit(e) {
        e.preventDefault()
        // console.log(this.refs.filename.value)
        // console.log(this.state.language)
        // console.log(this.refs.description.value)
        // console.log(this.state.changedCode)
        this.props.handleFastSubmit(this.refs.filename.value, this.state.language, this.refs.description.value, this.state.changedCode)
        $('#fastSubmitform').form('clear')
    }
    handleFileInvalid(e) {
        return false
    }
    handleFiletypeChange(e) {
        e.preventDefault()
        this.setState({
            language: e.target.value
        })
    }
    handleFilenameChange(e) {
        e.preventDefault()
        let filename = this.refs.filename.value
        let subfilename = this.checkSubfilename(filename)
        this.setState({language: subfilename || this.state.language})
    }
    checkSubfilename(filename) {
        let dot = -1
            for (let i = filename.length - 1; i >= 0; i--) if (filename[i] == '.') {
            dot = i;
            break
        }
        if (dot !== -1) {
            let subfilename = filename.substring(dot + 1, filename.length)
            // for (let i of Object.keys(this.mapLanguageToCompiler)) console.log(i)
            if (Object.keys(this.mapLanguageToCompiler).indexOf(subfilename) != -1) return this.mapLanguageToCompiler[subfilename]
            //return ""
        }
    }
    changeCode(newValue) {
        this.setState({
            changedCode: newValue
        })
    }
    render() {
        return (
            <div className="ui container">
                <div className="ui segment" style={{margin: '20px 0'}}>
                <h1>Fast Submit Your Code</h1>
                    <form className="ui form" id="fastSubmitform">
                        <div className="field">
                            <input type="text" name="filename" ref='filename' placeholder='Enter your filename' onChange={this.handleFilenameChange} />
                        </div>
                        <div className="field">
                            <select className="ui search dropdown" name="language" value={this.state.language} onChange={this.handleFiletypeChange}>
                                <option value="">Language</option>
                                <option value="C">C</option>
                                <option value="CPP">CPP</option>
                                <option value="CPP11">CPP11</option>
                                <option value="CPP14">CPP14</option>
                                <option value="CSharp">CSharp</option>
                                <option value="Python2">Python2</option>
                                <option value="Python3">Python3</option>
                                <option value="Java">Java</option>
                                <option value="JSX">JSX</option>
                                <option value="HTML">HTML</option>
                                <option value="XML">XML</option>
                                <option value="CSS">CSS</option>
                                <option value="Stylus">Stylus</option>
                                <option value="Scss">Scss</option>
                                <option value="Less">Less</option>
                                <option value="Javascript">Javascript</option>
                                <option value="JSON">JSON</option>
                                <option value="Swift">Swift</option>
                                <option value="ObjectiveC">ObjectiveC</option>
                                <option value="PHP">PHP</option>
                                <option value="Haskell">Haskell</option>
                                <option value="Markdown">Markdown</option>
                                <option value="Bash">Bash</option>
                                <option value="Plain_Text">Plain_Text</option>
                            </select>
                        </div>
                        <div className="field">
                            <textarea rows="2" ref="description" placeholder="Write some description..."></textarea>
                        </div>
                    </form>
                    <div className="ui segment" style={{height: '500px', padding: '0px'}}>
                        <Editor 
                                mode={this.mapCompilerToAce[this.state.language] || 'c_cpp'}
                                theme='tomorrow' 
                                name="editor"
                                tabSize={4}
                                fontSize={12}
                                onChange={this.changeCode}
                                value={`${this.state.changedCode}`}
                                width='100%'
                                height='100%'
                                showPrintMargin={false}
                                showGutter={true}
                                highlightActiveLine={true}
                            />
                    </div>
                    <button className="ui primary button" type="submit" form='fastSubmitform'>Submit</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
    handleFastSubmit: (filename, format, description, code) => {
        dispatch(fetchFastSubmit(filename, format, description, code))
    }
}) 

export default connect(mapStateToProps, mapDispatchToProps)(FastSubmit)