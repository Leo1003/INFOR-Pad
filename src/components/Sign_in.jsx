import React from 'react'
import { browserHistory } from 'react-router'
import { Button, Form, Container, Message } from 'semantic-ui-react'
import cookie from 'react-cookie'

class Sign_in extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
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
    console.log(e)
    return false
  }

  handleValid(e) {
    e.preventDefault();
    this.handleSignin()
  }
  handleSignin() {
    const formData = {}
    const fetchData = {}
    for(const field in this.refs) {
      formData[field] = this.refs[field].value
    }
    fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${formData.username}&password=${formData.password}`,
      credentials: 'include'
    }).then(res => {
      if(res.ok) {
        console.log("Login Successful");
        return res.json().then(json => {
          fetchData['name'] = json.name;
          fetchData['sessionid'] = json.sessionid;
          console.log(fetchData)
          cookie.save('username', json.name, { path: '/' })
          cookie.save('sessionid', json.sessionid, { path: '/' })
          browserHistory.push('/')
        })
      }
      else if(res.status == 403) {
        this.setState({'message': 'Login Fail'})
      }
    })
    .catch(err => { console.log(err) })
  }
  render() {
    let renderMessage = () => {
      if (this.state.message.length == 0) return
      return (
        <Message negative>
          <Message.Header>{this.state.message}</Message.Header>
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
