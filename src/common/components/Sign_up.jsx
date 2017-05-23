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
      <div className="ui middle aligned center aligned grid" style={{height: "90vh", margin: '0'}}>
        <div className="login column">
          <h1 className="ui black header">Sign up</h1>
          {renderMessage()}
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input type="text" name="username" ref='username' placeholder='Username' />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="mail icon"></i>
                  <input type="text" name="email" ref='email' placeholder='Email' />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="privacy icon"></i>
                  <input type="password" name="password" ref='password' placeholder='Password' />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="checkmark icon"></i>
                  <input type="password" name="confirm_password" ref='confirm_password' placeholder='Confirm Password' />
                </div>
              </div>
              <button className="ui fluid large blue submit button" type='submit'>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Sign_up
