import React from 'react'
import { connect } from 'react-redux'
import { fetchSaveCode, changeCode, fetchChangeSettings,fetchEditorModify } from '../../actions/editorActions'
// import ToolBar from './ToolBar.jsx'

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

class EditorContent extends React.Component {
    constructor(props) {
        super(props)
        this.clickSetting = this.clickSetting.bind(this)
        this.changeCode = this.changeCode.bind(this)
        this.changeTheme = this.changeTheme.bind(this)
        this.changeFontSize = this.changeFontSize.bind(this)
        this.changeTabSize = this.changeTabSize.bind(this)
        this.saveCode = this.saveCode.bind(this)
        this.changeMode = this.changeMode.bind(this)
        this.state = {
            showSetting: false,
            fontSize: 14,
            tabSize: 4,
            changedCode: false,
        }
    }
    componentDidMount() {
        $('.ui.dropdown').dropdown()
        $('#select').dropdown()
    }
    clickSetting() {
        this.setState({
            showSetting: !this.state.showSetting
        })
    }
    changeCode(newValue) {
        this.props.handleChangeCode(newValue, this.props.file.id)
        this.setState({
            changedCode: true
        })
    }
    changeTheme(e) {
        e.preventDefault()
        this.props.handleChangeSettings(this.props.sessionid, 'theme', e.target.value)
    }
    changeFontSize(e) {
        e.preventDefault()
        this.props.handleChangeSettings(this.props.sessionid, 'fontSize', e.target.value)
    }
    changeTabSize(e) {
        e.preventDefault()
        this.props.handleChangeSettings(this.props.sessionid, 'tabSize', e.target.value)
    }
    saveCode(e) {
        e.preventDefault()
        if(this.state.changedCode === true) this.props.handlefetchSaveCode(this.props.sessionid, this.props.file.id, this.props.file.code)
        this.setState({
            changedCode: false
        })
    }
    changeMode(e) {
        e.preventDefault()
        console.log(e.target.value)
        this.props.handleChangeMode(this.props.sessionid, this.props.file.id, 'format', e.target.value)
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
        return(  
            <div className="ui bottom attached segment" style={{
                height: '80vh',
                padding: '0em'
            }}>
                <div className="toolbar" style={{
                    margin: '0.5rem 0'
                }}>
                    <select className="ui search dropdown" onChange={this.changeMode} style={{
                        marginLeft: '0.5rem'
                    }}>
                        <option value="">{this.props.file.format}</option>
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
                    
                    <div className="ui icon button" style={{
                        float: 'right',
                        position: 'relative',
                        display: 'inline-block'
                    }} onClick={this.clickSetting}>
                        <i className="setting large icon"></i>
                    </div>
                    <div className="ui icon button" style={{
                        float: 'right',
                        position: 'relative',
                        display: 'inline-block'
                    }} onClick={this.saveCode} >
                        {this.props.saving ? <i className="spinner large icon"></i> : (this.state.changedCode ? <i className="save large icon"></i> : <i className="checkmark large icon"></i>)}
                    </div>
                    <div className="ui vertical pointing menu" style={{
                        right: '0.25em',
                        marginTop: '0.5em',
                        position: 'absolute',
                        zIndex: '5',
                        display: this.state.showSetting ? 'block' : 'none'
                    }}>
                        <div className="header item">Theme</div>
                        <div className="item">
                            <select className="ui fluid search dropdown" onChange={this.changeTheme}>
                                <option value="">{this.props.settings.theme}</option>
                                <option value="ambiance">ambiance</option>
                                <option value="chaos">chaos</option>
                                <option value="chrome">chrome</option>
                                <option value="clouds">clouds</option>
                                <option value="clouds_midnight">clouds_midnight</option>
                                <option value="cobalt">cobalt</option>
                                <option value="crimson_editor">crimson_editor</option>
                                <option value="dawn">dawn</option>
                                <option value="dreamweaver">dreamweaver</option>
                                <option value="eclipse">eclipse</option>
                                <option value="github">github</option>
                                <option value="idle_fingers">idle_fingers</option>
                                <option value="iplastic">iplastic</option>
                                <option value="katzenmilch">katzenmilch</option>
                                <option value="kr_theme">kr_theme</option>
                                <option value="kuroir">kuroir</option>
                                <option value="merbivore">merbivore</option>
                                <option value="merbivore_soft">merbivore_soft</option>
                                <option value="mono_industrial">mono_industrial</option>
                                <option value="monokai">monokai</option>
                                <option value="pastel_on_dark">pastel_on_dark</option>
                                <option value="solarized_dark">solarized_dark</option>
                                <option value="solarized_light">solarized_light</option>
                                <option value="sqlserver">sqlserver</option>
                                <option value="terminal">terminal</option>
                                <option value="textmate">textmate</option>
                                <option value="tomorrow">tomorrow</option>
                                <option value="tomorrow_night_blue">tomorrow_night_blue</option>
                                <option value="tomorrow_night_bright">tomorrow_night_bright</option>
                                <option value="tomorrow_night_eighties">tomorrow_night_eighties</option>
                                <option value="tomorrow_night">tomorrow_night</option>
                                <option value="twilight">twilight</option>
                                <option value="vibrant_ink">vibrant_ink</option>
                                <option value="xcode">xcode</option>
                            </select>
                        </div>
                        <div className="header item">Tab Size</div>
                        <div className="item">
                            <div className="ui fluid input">
                                <input type="number" value={this.props.settings.tabSize} onChange={this.changeTabSize} />
                            </div>
                        </div>
                        <div className="header item">Font Size</div>
                        <div className="item">
                            <div className="ui fluid input">
                                <input type="number"  value={this.props.settings.fontSize} onChange={this.changeFontSize} />
                            </div>
                        </div>
                    </div>
                </div>
            
                <Editor 
                    mode={mode[this.props.file.format]}
                    theme={this.props.settings.theme}
                    name="editor"
                    onChange={this.changeCode}
                    value={`${this.props.file.code}`}
                    tabSize={parseInt(this.props.settings.tabSize, 10)}
                    fontSize={parseInt(this.props.settings.fontSize, 10)}
                    width='100%'
                    height='100%'
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    saving: state.editor.saving,
    settings: state.user.settings
})

const mapDispatchToProps = (dispatch) => ({
    handlefetchSaveCode: (sessionid, fsid, code) => {
        dispatch(fetchSaveCode(sessionid, fsid, code))
    },
    handleChangeCode: (code, fsid) => {
        dispatch(changeCode(code, fsid))
    },
    handleChangeSettings: (sessionid, settingName, settingValue) => {
        dispatch(fetchChangeSettings(sessionid, settingName, settingValue))
    },
    handleChangeMode: (sessionid, fsid, modifyType, modifyValue) => {
        dispatch(fetchEditorModify(sessionid, fsid, modifyType, modifyValue))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContent)