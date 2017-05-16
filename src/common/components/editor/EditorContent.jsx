import React from 'react'

const Editor = (props) => {
  if (typeof window !== 'undefined') {
    const AceEditor = require('react-ace').default;
    require('brace/mode/javascript');
    require('brace/theme/github');

    return <AceEditor {...props}/>
  }

  return null;
}


class EditorContent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div>
                <h1>This is Editor!</h1>
                <Editor 
                    mode="java"
                    theme="github"
                    name="editor"
                    onLoad={this.onLoad}
                    onChange={this.onChange}
                    fontSize={14}
                    width='100%'
                    height="500px"
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                />
            </div>
        )
    }
}

export default EditorContent