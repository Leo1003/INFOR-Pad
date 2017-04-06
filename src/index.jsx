import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, Container, Menu } from 'semantic-ui-react'

const Login_Form = () => (
  <div>
    <Menu secondary inverted style={{background: 'black', margin: '0'}}>
        <Menu.Item name="jizz1" />
        <Menu.Item name="Jizz2" />
      </Menu>
    <Container>
      <h1>INFOR-PAD LOGIN</h1>
      <Form>
        <Form.Field>
          <label>Username:</label>
          <input placeholder='Input your Username' />
        </Form.Field>
        <Form.Field>
          <label>Password:</label>
          <input type='password' placeholder='Input your Password' />
        </Form.Field>
        <Button type='submit'>Login</Button>
      </Form>
    </Container>
  </div>
)

ReactDOM.render(<Login_Form />, document.getElementById('app'))
