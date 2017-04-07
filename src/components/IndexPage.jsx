import React from 'react'
import { Menu } from 'semantic-ui-react'

const IndexPage = (props) => (
  <div>
    <Menu secondary inverted style={{background: 'black', margin: '0'}}>
      <Menu.Item name="jizz1" />
      <Menu.Item name="Jizz2" />
    </Menu>
    {props.children}
  </div>
)

export default IndexPage
