import React from 'react'
import { browserHistory } from 'react-router'
import { Button, Form, Container, Message } from 'semantic-ui-react'
import cookie from 'react-cookie'

class Sign_in extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    //console.log(this.props)
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
    console.log(e)
    return false
  }

  handleValid(e) {
    e.preventDefault();
    this.handleSignin()
  }
  handleSignin() {
    const formData = {}
    for(const field in this.refs) {
      formData[field] = this.refs[field].value
    }
    this.props.handleSignin(formData)
  }
  render() {
    let renderMessage = () => {
      if (this.props.message.length == 0) return
      return (
        <Message negative>
          <Message.Header>{this.props.message}</Message.Header>
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
                <input type="text" name="username" ref='username' placeholder='Input your Username' />
              </div>
              <div className="field">
                <label>Password:</label>
                <input type="password" name="password" ref='password' placeholder='Input your Password' />
              </div>
              <button className="ui button" type='submit'>Sign in</button>
            </form>
        </Container>
      </div>
    )
  }

}

export default Sign_in
