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
              prompt: this.props.lang == 'en' ? 'Please enter your Username' : 'الرجاء إدخال اسم المستخدم'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: this.props.lang == 'en' ? 'Please enter your Password' : 'من فضلك أدخل رقمك السري'
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
          <h1>{'INFOR-Pad ' + (this.props.lang == 'en' ? 'Sign In' : 'تسجيل الدخول')}</h1>
          {renderMessage()}
            <form className="ui form">
              <div className="field">
                <label>{this.props.lang == 'en' ? 'Username:' : 'اسم المستخدم'}</label>
                <input type="text" name="username" ref='username' placeholder={this.props.lang == 'en' ? 'Input your Username' : 'أدخل اسم المستخدم'} />
              </div>
              <div className="field">
                <label>{this.props.lang == 'en' ? 'Password:' : 'كلمه السر'}</label>
                <input type="password" name="password" ref='password' placeholder={this.props.lang == 'en' ? 'Input your Password' : 'أدخل كلمة المرور'} />
              </div>
              <div className="field">
                <div className="ui checkbox">
                  <input type="checkbox" name="autologin" ref='autologin'/>
                  <label>{this.props.lang == 'en' ? 'Remember me' : 'تذكرنى'}</label>
                </div>
              </div>
              <button className="ui button" type='submit'>{this.props.lang == 'en' ? 'Sign in' : 'تسجيل الدخول'}</button>
            </form>
        </Container>
      </div>
    )
  }

}

export default Sign_in
