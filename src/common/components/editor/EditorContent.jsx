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
    }
    render() {
        let segment_style={
            Height: "100vh",
            padding: '0em'
        }
        return(
            <div>
                <div className="ui top attached tabular menu">
                    <a className="item active">
                        {this.props.file.name}
                    </a>
                </div>
                <div className="ui bottom attached segment" style={segment_style}>
                    <button className="ui icon top left pointing dropdown button">
                        <i className="setting icon"></i>
                        <div className="menu">
                            <div className="header">Theme</div>
                            <p>Jizz</p>
                            <div className="header">KeyBoard</div>
                            <p>Jizz</p>
                            <div className="header">Tab Size</div>
                            <p>Jizz</p>
                            <div className="header">Font Size</div>
                        </div>
                    </button>
                    <Editor 
                        mode="c_cpp"
                        theme="tomorrow_night"
                        name="editor"
                        onLoad={this.onLoad}
                        onChange={this.onChange}
                        fontSize={14}
                        width='100%'
                        height='90vh'
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