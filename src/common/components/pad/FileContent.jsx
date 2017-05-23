import React from 'react'
import { Link } from 'react-router'
const moment = require('moment')

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

    require("brace/theme/tomorrow_night")
    return <AceEditor {...props}/>
  }
  return null;
}

class FileContent extends React.Component {
  constructor(props) {
    super(props)
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
    console.log(this.props)
    return (
      <div>
        <h1>{this.props.file.name}</h1>
        <div className="content">
          <p><b>Type: </b>&nbsp;{this.props.file.format}</p>
          <p><b>Owner: </b>&nbsp;<a href={'/user/' + this.props.file.owner.name}>{this.props.file.owner.name}</a></p>
          <p><b>Location: </b>&nbsp;<Link to={'/pad/folder/' + this.props.file.parent.id}>{this.props.file.parent.name}</Link></p>
          <p><b>CreateDate: </b>&nbsp;{moment(this.props.file.createDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p><b>Last Modify: </b>&nbsp;{moment(this.props.file.modifyDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p style={{wordBreak: "break-all"}}><b>Description: </b>&nbsp;{this.props.file.description}</p>
          {this.props.file.isPublic ? <p><b>Share ID:</b>&nbsp;<a href={'/' + this.props.file.shortid }>{this.props.file.shortid}</a></p> : null}
          <hr />
          <p><b>Code:</b></p>
          { this.props.userid === this.props.file.owner.id ? <a href={'/editor/' + this.props.file.id } target="_blank">Open with Editor</a> : null }
          {this.props.file.code.length > 0 ?
             <Editor 
                mode={mode[this.props.file.format]}
                theme='tomorrow_night'
                name="editor"
                value={`${this.props.file.code}`}
                tabSize={4}
                fontSize={14}
                width='100%'
                height='300px'
                showPrintMargin={false}
                showGutter={true}
                readOnly={true}
              /> : null 
          }
          <br />
        </div>
      </div>
    )
  }
}

export default FileContent
