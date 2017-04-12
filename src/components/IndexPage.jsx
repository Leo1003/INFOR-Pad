import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router'

const IndexPage = (props) => (
  <div>
    <Menu secondary inverted style={{background: 'black', margin: '0'}}>
      <Menu.Item name="INFOR PAD" as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item name="Sign in" as={Link} to='/Sign_in' />
        <Menu.Item name="Sign up" as={Link} to='/Sign_up' />
      </Menu.Menu>
    </Menu>
    {props.children}
  </div>
)

// const IndexPage = (props) => (
//   <div>
//     <ul>
//       <li><Link to="/">Home</Link></li>
//       <li><Link to="/Sign_in">Sign_in</Link></li>
//       <li><Link to="/Sign_up">Sign_up</Link></li>
//     </ul>
//     <hr />
//     {props.children}
//   </div>
// )

export default IndexPage
