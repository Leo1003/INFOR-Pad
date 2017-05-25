import React from 'react'
import { browserHistory } from 'react-router'

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

const HomePage = () => (
    <div>
        <div className="ui inverted vertical center aligned segment masthead" style={{background: '#24292e'}}>
            <div className="ui container text">
                <h1 className="ui inverted header">INFOR-Pad</h1>
                <h2 className="inverted">A Conveniece Online Coding and Sharing Tool</h2>
                <button className="ui huge primary button" onClick={() => browserHistory.push('/fastSubmit')}>Go On A Fast Submit</button>
            </div>
        </div>
        <div className="ui container" style={{marginTop: '20px'}}>
            <div className="ui two column stackable grid">
                <div className="three column row">
                    <div className="column">
                        <div style={{textAlign: 'center'}}>
                            <i style={{opacity: '0.7'}}className="circular inverted huge edit icon"></i>
                            <p style={{fontSize: '2rem', wordBreak: 'break-word'}}>Impeccable online development environment</p>
                        </div>
                    </div>
                    <div className="column">
                        <div style={{textAlign: 'center'}}>
                            <i style={{opacity: '0.7'}}className="circular inverted huge terminal icon"></i>
                            <p style={{fontSize: '2rem', wordBreak: 'break-word'}}>Execute your code instantly</p>
                        </div>
                    </div>
                    <div className="column">
                        <div style={{textAlign: 'center'}}>
                            <i style={{opacity: '0.7'}}className="circular inverted huge share alternate icon"></i>
                            <p style={{fontSize: '2rem', wordBreak: 'break-word'}}>Share you code immediately</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default HomePage

