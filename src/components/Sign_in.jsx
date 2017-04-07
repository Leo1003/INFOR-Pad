import React from 'react'
import { Button, Form, Container, Menu } from 'semantic-ui-react'

const Sign_in = () => (
  <div>
    <Container>
      <h1>INFOR-PAD Sign in</h1>
      <Form>
        <Form.Field>
          <label>Username:</label>
          <input placeholder='Input your Username' />
        </Form.Field>
        <Form.Field>
          <label>Password:</label>
          <input type='password' placeholder='Input your Password' />
        </Form.Field>
        <Button type='submit'>Sign in</Button>
      </Form>
    </Container>
  </div>
)

export default Sign_in
