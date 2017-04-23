import React from 'react'
import { browserHistory } from 'react-router'
import { Button, Form, Container, Message } from 'semantic-ui-react'

class Sign_up extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    $('.ui.form').form({
      fields: {
        username: {
          identifier: 'username',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your Username'
            }
          ]
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your email'
            },
            {
              type: 'email',
              prompt: 'Please enter a valid email'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your Password'
            },
            {
              type: 'length[6]',
              prompt: 'Your password must be at least 6 characters'
            }
          ]
        },
        confirm_password: {
          identifier: 'confirm_password',
          rules: [
            {
              type: 'empty',
              prompt: 'Please confirm your password'
            },
            {
              type: 'match[password]',
              prompt: 'Your confirm password is wrong'
            }
          ]
        }
      },
      inline: true,
      onFailure: this.handleInvalid.bind(this),
      onSuccess: this.handleValid.bind(this)
    })
  }

  handleInvalid(e) {
    return false
  }

  handleValid(e) {
    e.preventDefault();
    this.handleSignup()
  }

  handleSignup() {
    const formData = {}
    for(const field in this.refs) {
      formData[field] = this.refs[field].value
    }
    this.props.handleSignUp(formData)
  }
  render() {
    let renderMessage = () => {
      if (this.props.error_message.length == 0) return
      return (
        <Message negative>
          <Message.Header>{this.props.error_message}</Message.Header>
        </Message>
      )
    }
    return (
      <Container>
        <h1>INFOR-PAD Sign up</h1>
        {renderMessage()}
        <form className="ui form">
          <div className="field">
            <label>Username:</label>
            <input type="text" name="username" ref='username' placeholder='Input your Username' />
          </div>
          <div className="field">
            <label>Email:</label>
            <input type="text" name="email" ref='email' placeholder='Input your email' />
          </div>
          <div className="field">
            <label>Password:</label>
            <input type="password" name="password" ref='password' placeholder='Input your Password' />
          </div>
          <div className="field">
            <label>Confirm:</label>
            <input type="password" name="confirm_password" ref='confirm_password' placeholder='Confirm your Password' />
          </div>
          <button className="ui button" type='submit'>Sign up</button>
        </form>
      </Container>
    )
  }
}

export default Sign_up
