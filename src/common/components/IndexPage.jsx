import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router'
import Logout from './Logout.jsx'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("Index")
    console.log(this.props)
    let rightMenu = () => {
      if(this.props.isLogin) return (
        <div>
        <Menu.Item name="username" as={Link} />
        <Logout />
        </div>
      )
      else return (
        <div>
        <Menu.Item name="Sign in" as={Link} to='/Sign_in' />
        <Menu.Item name="Sign up" as={Link} to='/Sign_up' />
        </div>
      )
    }
    return (
      <div>
        <Menu secondary inverted style={{background: 'black', margin: '0'}}>
          <Menu.Item name="INFOR PAD" as={Link} to='/' />
          <Menu.Menu position='right'>
            {rightMenu()}
          </Menu.Menu>
        </Menu>
        {this.props.children}
      </div>
    )
  }
}


export default IndexPage
