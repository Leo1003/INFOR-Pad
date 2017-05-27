import React from 'react'
import { browserHistory } from 'react-router'

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
                            <i style={{opacity: '0.7', fontSize: '3rem', marginBottom: '10px'}} className="circular inverted huge edit icon"></i>
                            <p style={{ fontSize: '1.3rem', wordBreak: 'break-word'}}>You can code anywhere with INFOR-Pad, even if using mobile devices. In addition, you can store your code on INFOR-Pad.</p>
                        </div>
                    </div>
                    <div className="column">
                        <div style={{textAlign: 'center'}}>
                            <i style={{opacity: '0.7', fontSize: '3rem', marginBottom: '10px'}} className="circular inverted huge terminal icon"></i>
                            <p style={{ fontSize: '1.3em', wordBreak: 'break-word'}}>INFOR-Pad has a powerful backend system. You can compile and execute your code immediately. C, C++, Python are now supported.
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div style={{textAlign: 'center'}}>
                            <i style={{opacity: '0.7', fontSize: '3rem', marginBottom: '10px'}} className="circular inverted huge share alternate icon"></i>
                            <p style={{ fontSize: '1.3em', wordBreak: 'break-word'}}>Another feature of INFOR-Pad is share your code instantly. You can share your code with shortid to anyone.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="ui vertical footer" style={{
            marginBottom: '20px',
            marginTop: '30px'
        }}>
            <div className="ui container" style={{
                textAlign: 'center'
            }}>
                <a href="https://infor.org">Produce by INFOR29th</a>
            </div>
        </div>
    </div>
)

export default HomePage

