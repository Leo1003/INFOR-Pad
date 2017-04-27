import React from 'react'
import NavBar from './partials/NavBar.jsx'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <NavBar name={this.props.name} isLogin={this.props.isLogin} />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Main
