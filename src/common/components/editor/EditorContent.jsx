import React from 'react'
// import ToolBar from './ToolBar.jsx'

const Editor = (props) => {
  if (typeof window !== 'undefined') {
    const AceEditor = require('react-ace').default;
    require('brace/mode/c_cpp');
    require('brace/theme/tomorrow_night');

    return <AceEditor {...props}/>
  }

  return null;
}


class EditorContent extends React.Component {
    constructor(props) {
        super(props)
        this.clickSetting = this.clickSetting.bind(this)
        this.state = {
            showSetting: false
        }
    }
    clickSetting() {
        this.setState({
            showSetting: !this.state.showSetting
        })
    }
    componentDidMount() {
        $('.ui.dropdown').dropdown()
        $('#select').dropdown()
    }
    render() {
        return(
            <div>
                <div className="ui top attached tabular menu">
                    <a className="item active">
                        {this.props.file.name}
                    </a>
                </div>
                <div className="ui bottom attached segment" style={{
                    height: '100vh',
                    padding: '0em'
                }}>
                    <div className="toolbar" style={{
                        margin: '0.5rem 0'
                    }}>
                        <div className="ui selection dropdown" style={{
                            marginLeft: '0.5rem'
                        }}>
                            <input type="hidden" name="Language" />
                            <div className="text">Language</div>
                            <div className="menu">
                                <div className="item">C</div>
                                <div className="item">C++</div>
                                <div className="item" name="HTML">HTML</div>
                                <div className="item" name="CSS">CSS</div>
                                <div className="item" name="markdown">Markdown</div>
                                <div className="item" name="C">C</div>
                                <div className="item" name="CPP">C++</div>
                                <div className="item" name="CPP11">C++11</div>
                                <div className="item" name="CPP14">C++14</div>
                                <div className="item" name="Python2">Python 2</div>
                                <div className="item" name="Python3">Python 3</div>
                                <div className="item" name="Bash">Bash</div>
                                <div className="item" name="Plain_text">Plain Text</div>
                            </div>
                        </div>
                        <div className="ui icon button" style={{
                            float: 'right',
                            position: 'relative',
                            display: 'inline-block'
                        }} onClick={this.clickSetting}>
                            <i className="setting icon"></i>
                        </div>
                        <div className="ui vertical pointing menu" style={{
                            right: '0.25em',
                            margin: '0em',
                            position: 'absolute',
                            zIndex: '5',
                            display: this.state.showSetting ? 'block' : 'none'
                        }}>
                            <div className="header item">Theme</div>
                            <div className="item">
                                <div className="ui fluid search selection dropdown">
                                    <input type="text" />
                                    <div className="text">Theme</div>
                                    <div className="menu">
                                        <div className="divider"></div>
                                        <div className="item">ambiance</div>
                                        <div className="item">chaos</div>
                                        <div className="item">chrome</div>
                                        <div className="item">clouds</div>
                                        <div className="item">clouds_midnight</div>
                                        <div className="item">cobalt</div>
                                        <div className="item">crimson_editor</div>
                                        <div className="item">dawn</div>
                                        <div className="item">dreamweaver</div>
                                        <div className="item">eclipse</div>
                                        <div className="item">github</div>
                                        <div className="item">idle_fingers</div>
                                        <div className="item">iplastic</div>
                                        <div className="item">katzenmilch</div>
                                        <div className="item">kr_theme</div>
                                        <div className="item">kuroir</div>
                                        <div className="item">merbivore</div>
                                        <div className="item">merbivore_soft</div>
                                        <div className="item">mono_industrial</div>
                                        <div className="item">monokai</div>
                                        <div className="item">pastel_on_dark</div>
                                        <div className="item">solarized_dark</div>
                                        <div className="item">solarized_light</div>
                                        <div className="item">sqlserver</div>
                                        <div className="item">terminal</div>
                                        <div className="item">textmate</div>
                                        <div className="item">tomorrow</div>
                                        <div className="item">tomorrow_night_blue</div>
                                        <div className="item">tomorrow_night_bright</div>
                                        <div className="item">tomorrow_night_eighties</div>
                                        <div className="item">tomorrow_night</div>
                                        <div className="item">twilight</div>
                                        <div className="item">vibrant_ink</div>
                                        <div className="item">xcode</div>
                                    </div>
                                </div>
                            </div>
                            <div className="header item">KeyBoard</div>
                            <div className="item">
                                <div className="ui fluid search selection dropdown">
                                    <input type="text" />
                                    <div className="text">Default</div>
                                    <div className="menu">
                                        <div className="divider"></div>
                                        <div className="item">Default</div>
                                        <div className="item">Emacs</div>
                                        <div className="item">Vim</div>
                                    </div>
                                </div>
                            </div>
                            <div className="header item">Tab Size</div>
                            <div className="item">
                                <div className="ui fluid input">
                                    <input type="number" value="4" />
                                </div>
                            </div>
                            <div className="header item">Font Size</div>
                            <div className="item">
                                <div className="ui fluid input">
                                    <input type="number" value="12"/>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <Editor 
                        mode="c_cpp"
                        theme="tomorrow_night"
                        name="editor"
                        onLoad={this.onLoad}
                        onChange={this.onChange}
                        fontSize={14}
                        width='100%'
                        height='100%'
                        showPrintMargin={false}
                        showGutter={true}
                        highlightActiveLine={true}
                       />
                </div>
            </div>
        )
    }
}

export default EditorContent