import React from 'react'
import { Link } from 'react-router'
const moment = require('moment')

import io from 'socket.io-client'
let socket = undefined


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

   require('brace/keybinding/vim')
    require('brace/keybinding/emacs')
    require("brace/theme/ambiance")
    require("brace/theme/chaos")
    require("brace/theme/chrome")
    require("brace/theme/clouds")
    require("brace/theme/clouds_midnight")
    require("brace/theme/cobalt")
    require("brace/theme/crimson_editor")
    require("brace/theme/dawn")
    require("brace/theme/dreamweaver")
    require("brace/theme/eclipse")
    require("brace/theme/github")
    require("brace/theme/idle_fingers")
    require("brace/theme/iplastic")
    require("brace/theme/katzenmilch")
    require("brace/theme/kr_theme")
    require("brace/theme/kuroir")
    require("brace/theme/merbivore")
    require("brace/theme/merbivore_soft")
    require("brace/theme/mono_industrial")
    require("brace/theme/monokai")
    require("brace/theme/pastel_on_dark")
    require("brace/theme/solarized_dark")
    require("brace/theme/solarized_light")
    require("brace/theme/sqlserver")
    require("brace/theme/terminal")
    require("brace/theme/textmate")
    require("brace/theme/tomorrow")
    require("brace/theme/tomorrow_night_blue")
    require("brace/theme/tomorrow_night_bright")
    require("brace/theme/tomorrow_night_eighties")
    require("brace/theme/tomorrow_night")
    require("brace/theme/twilight")
    require("brace/theme/vibrant_ink")
    require("brace/theme/xcode")
    return <AceEditor {...props}/>
  }
  return null;
}

class FileContent extends React.Component {
  constructor(props) {
    super(props)
    this.openRightBar = this.openRightBar.bind(this)
    this.runCode = this.runCode.bind(this)
    this.changeStdin = this.changeStdin.bind(this)

    this.socketCallback = this.socketCallback.bind(this)
    this.onResult = this.onResult.bind(this)
    this.submit = this.submit.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
    this.state = {
      stdin: props.file.stdin,
      result: {},
      compiling: false,
    }
  }
  componentDidMount() {
      socket = io('/client', {query: `sessionid=${this.props.sessionid}`});
      socket.on('connect', () => {
          console.log("Connected to server!");
          this.socketCallback();
      });
      socket.on('error', error => {
          console.error(error)
          this.socketCallback(error);
      });
  }
  socketCallback(err) {
      if (err) {
          this.setState({
              result: err
          })
      } else {
          this.onResult(result => {
              this.setState({
                  result: result,
                  compiling: false
              }, () => console.log(this.state.result))
          });
          console.log("callback: connect!")
      }
  }
  onResult(callback) {
      socket.on('Result', data => {
          let result = {};
          result.id = data.id;
          if (data.type == 0) {
              result.status = 'Success';
          } else if (data.type == 1) {
              result.status = 'ComplieError';
          } else {
              result.status = 'Error';
          }
          result.time = data.time != -1 ? data.time : undefined;
          result.memory = data.memory != -1 ? data.memory : undefined;
          result.exitcode = data.exitcode;
          result.signal = data.signal;
          result.killed = data.killed;
          result.stdout = data.output;
          result.stderr = data.error;
          return callback(result);
      });
  }
  submit(fileid, language, stdin) {
      socket.emit('Submit', {
          fileid: fileid,
          language: language,
          stdin: stdin
      });
  }
  openRightBar(e) {
      e.preventDefault()
      console.log("open side bar")
      $('.lxtester.sidebar')
          .sidebar('setting', 'dimPage', false)
          .sidebar('setting', 'mobileTransition', 'overlay')
          .sidebar('setting', 'transition', 'overlay')
          .sidebar('toggle')
  }
  runCode(e) {
      e.preventDefault()
      console.log("submit")
      console.log(this.refs.stdin.value)
      //save stdin
      //this.props.handleEditorModify(this.props.sessionid, this.props.file.id, 'stdin', this.refs.stdin.value)
      // socket 
      this.setState({ compiling: true }, this.submit(this.props.file.id, this.props.file.format, this.refs.stdin.value))
  }
  changeStdin(e) {
    e.preventDefault()
    this.setState({
        stdin: this.refs.stdin.value
    })
  }
  downloadFile() {
      let mimeType = {
      "C":"c",
      "CPP": "cpp",
      "CPP11": "cpp",
      "CPP14": "cpp",
      "Python2": "py",
      "Python3": "py",
      "Java": "java",
      "JSX": "jsx",
      "HTML": "html",
      "XML": "xml",
      "CSS": "css",
      "Stylus": "styl",
      "Scss": "scss",
      "Less": "less",
      "CSharp": "cs",
      "Javascript": "js",
      "JSON": "json",
      "Swift": "swift",
      "ObjectiveC": "m",
      "PHP": "php",
      "Haskell": "hs",
      "Markdown": "md",
      "Bash": "sh",
      "Plain_Text": "txt"
    }
      let filename = 'download'
      let blob = new Blob([this.props.file.code], {type: 'text/plain'});
      if(window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename);
      }
      else{
          let elem = window.document.createElement('a');
          elem.href = window.URL.createObjectURL(blob);
          elem.download = filename + `.${mimeType[this.props.file.format]}`;        
          document.body.appendChild(elem);
          elem.click();        
          document.body.removeChild(elem);
      }
  }
  
  componentWillUnmount() {
    console.log("file content unmount")
    $('.lxtester.sidebar').remove()
  }
  render() {
      let mode = {
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
    return (
      <div>
        <div className="ui right wide lxtester sidebar vertical inverted menu">
            <div className="header item">Input</div>
            <div className="item">
                <div className="ui inverted stdin form">
                    <div className="field">
                        <textarea onChange={this.changeStdin} ref="stdin" value={this.state.stdin} ></textarea>
                    </div>
                    <button className="ui inverted button" onClick={this.runCode}>{this.state.compiling ? "Compiling..." : "Compile & Run"}</button>
                </div>
            </div>
            <div className="item">
                <label>Ouput</label>
            </div>
            <div className="item">
                <div className="ui inverted stdin form">
                    <div className="field">
                        <textarea value={this.state.compiling ? "" : this.state.result.stdout} readOnly></textarea>
                    </div>
                </div>
            { this.state.compiling ? null : 
            <div>
                { this.state.result.stderr === undefined ? null : <p>Stderr: {this.state.result.stderr} </p>}
                { this.state.result.status === undefined ? null : <p>Status: {this.state.result.status}</p>}
                { this.state.result.exitcode === undefined ? null : <p>Process exited with status: {this.state.result.signal ? this.state.result.signal : this.state.result.exitcode}</p>}
                { this.state.result.time === undefined ? null : <p>Execution time: {this.state.result.time / 1000}s</p>}
                { this.state.result.memory === undefined ? null : <p>Memory usage: {this.state.result.memory}KB</p>}
            </div>
            }
            </div> 
        </div>
        <div className="pusher">
          <div className="content">
            <div className="ui segment" style={{margin: '20px 0'}}>
              <p><b>FileName: </b>&nbsp;{this.props.file.name}</p>
              <p><b>Type: </b>&nbsp;{this.props.file.format}</p>
              <p><b>Size: </b>&nbsp;{this.props.file.size > 1024 ? `${(this.props.file.size / 1024).toFixed(2)} KB` : `${this.props.file.size} Byte`}</p>
              {this.props.file.owner.name ? <p><b>Owner: </b>&nbsp;{this.props.file.owner.name}</p> : null}
              {this.props.file.parent.id ? <p><b>Location: </b>&nbsp;<Link to={'/pad/folder/' + this.props.file.parent.id}>{this.props.file.parent.name}</Link></p> : null}
              <p><b>CreateDate: </b>&nbsp;{moment(this.props.file.createDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
              <p><b>Last Modify: </b>&nbsp;{moment(this.props.file.modifyDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
              <p style={{wordBreak: "break-all"}}><b>Description: </b>&nbsp;{this.props.file.description}</p>
              {this.props.file.isPublic ? <p><b>Share ID:</b>&nbsp;<a href={'/' + this.props.file.shortid }>{this.props.file.shortid}</a></p> : null}
              <p><b>Code:</b></p>
              <div className="ui basic button" style={{marginBottom: '10px'}} onClick={this.openRightBar}>
                  Open Compiler
              </div>
              <div className="ui basic button" style={{marginBottom: '10px'}} onClick={this.downloadFile}>
                Download File
              </div>
              { this.props.userid === this.props.file.owner.id && this.props.userid.length > 0 ? <a href={'/editor/' + this.props.file.id } target="_blank">Open with Editor</a> : null }
              {this.props.file.code.length > 0 ?
                <Editor 
                    mode={mode[this.props.file.format]}
                    theme={this.props.userSettings.theme || "monokai"}
                    name="editor"
                    value={`${this.props.file.code}`}
                    tabSize={4}
                    fontSize={14}
                    width='100%'
                    height='500px'
                    showPrintMargin={false}
                    showGutter={true}
                    readOnly={true}
                  /> : null 
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FileContent
