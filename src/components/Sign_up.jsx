import React from 'react'
import { Button, Form, Container } from 'semantic-ui-react'

const Sign_up = () => (
  <div>
    <Container>
      <h1>INFOR-PAD Sign up</h1>
      <Form>
        <Form.Field>
          <label>Username:</label>
          <input placeholder='Input your Username' />
        </Form.Field>
        <Form.Field>
          <label>Password:</label>
          <input type='password' placeholder='Input your Password' />
        </Form.Field>
        <Form.Field>
          <label>Confirm:</label>
          <input type='password' placeholder='Confirm your Password' />
        </Form.Field>
        <Button type='submit'>Sign up</Button>
      </Form>
    </Container>
  </div>
)

export default Sign_up
