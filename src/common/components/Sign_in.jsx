import React from 'react'
import { browserHistory } from 'react-router'
import { Button, Form, Container, Message } from 'semantic-ui-react'
import cookie from 'react-cookie'

class Sign_in extends React.Component {
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
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your Password'
            }
          ]
        },
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
    console.log(this.refs.autologin.checked)
    this.handleSignin()
  }
  handleSignin() {
    const formData = {}
    for(const field in this.refs) {
      formData[field] = this.refs[field].value
    }
    console.log(formData)
    this.props.handleSignIn(formData, (this.refs.autologin.checked ? 1 : 0))
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
      <div>
        <Container>
          <h1>INFOR-PAD Sign in</h1>
          {renderMessage()}
            <form className="ui form">
              <div className="field">
                <label>Username:</label>
                <input type="text" name="username" ref='username' placeholder='Enter your Username' />
              </div>
              <div className="field">
                <label>Password:</label>
                <input type="password" name="password" ref='password' placeholder='Enter your Password' />
              </div>
              <div className="field">
                <div className="ui checkbox">
                  <input type="checkbox" name="autologin" ref='autologin'/>
                  <label>Remember me</label>
                </div>
              </div>
              <button className="ui button" type='submit'>Sign in</button>
            </form>
        </Container>
      </div>
    )
  }

}

export default Sign_in
