import React from 'react'
import { Button, Header, Menu } from 'semantic-ui-react'

const HomePage = () => (
    <div className="pusher">
        <div className="ui inverted vertical center aligned segment masthead">
            <div className="ui container">
                <Menu size='large' secondary inverted pointing>

                </Menu>
            </div>
            <div className="ui container text">
                <h1 className="ui inverted header">INFOR-Pad</h1>
                <h2 className="inverted">A Conveniece Online Coding and Sharing Tool</h2>
                <Button primary size='huge'>Start coding</Button>
            </div>
        </div>
        <div className="ui vertical stripe segment" style={{overflowY: 'auto'}}>
            <div className="ui middle aligned stackable grid container">
                <div className="row">
                    <div className="three wide column">
                        <i className="circular inverted huge edit icon"></i>
                    </div>
                    <div className="thirteen wide column">
                        <h3 className="ui header">Impeccable online development environment</h3>
                        <p>................................................................................................................................</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="ui vertical stripe segment" style={{overflowY: 'auto'}}>
            <div className="ui middle aligned stackable grid container">
                <div className="row">
                    <div className="thirteen wide column">
                        <h3 className="ui header">Execute your code instantly</h3>
                        <p>...</p>
                    </div>
                    <div className="three wide column">
                        <i className="circular inverted huge terminal icon"></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="ui vertical stripe segment" style={{overflowY: 'auto'}}>
            <div className="ui middle aligned stackable grid container">
                <div className="row">
                    <div className="three wide column">
                        <i className="circular inverted huge share alternate icon"></i>
                    </div>
                    <div className="thirteen wide column">
                        <h3 className="ui header">Share your code</h3>
                        <p>...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default HomePage
