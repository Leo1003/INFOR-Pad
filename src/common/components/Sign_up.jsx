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
              prompt: this.props.lang == 'en' ? 'Please enter your Username' : 'الرجاء إدخال اسم المستخدم'
            }
          ]
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: this.props.lang == 'en' ? 'Please enter your email' : 'رجاءا أدخل بريدك الإلكتروني'
            },
            {
              type: 'email',
              prompt: this.props.lang == 'en' ? 'Please enter a valid email' : 'يرجى إدخال البريد الإلكتروني الصحيح' 
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: this.props.lang == 'en' ? 'Please enter your Password' : 'من فضلك أدخل رقمك السري'
            },
            {
              type: 'length[6]',
              prompt: this.props.lang == 'en' ? 'Your password must be at least 6 characters' : 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل'
            }
          ]
        },
        confirm_password: {
          identifier: 'confirm_password',
          rules: [
            {
              type: 'empty',
              prompt: this.props.lang == 'en' ? 'Please confirm your password' : 'يرجى التأكد من صحة كلمة المرور الخاصة بك'
            },
            {
              type: 'match[password]',
              prompt: this.props.lang == 'en' ? 'Your confirm password is wrong' : 'كلمة مرور التأكيد غير صحيحة'
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
        <div className="column">
          <h1 className="ui black header">{(this.props.lang == 'en' ? 'Sign up' : 'سجل')}</h1>
          {renderMessage()}
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input type="text" name="username" ref='username' placeholder={this.props.lang == 'en' ? 'Username:' : 'اسم المستخدم'} />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="mail icon"></i>
                  <input type="text" name="email" ref='email' placeholder={this.props.lang == 'en' ? 'Email:' : 'البريد الإلكتروني'} />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="privacy icon"></i>
                  <input type="password" name="password" ref='password' placeholder={this.props.lang == 'en' ? 'Password:' : 'كلمه السر'} />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="checkmark icon"></i>
                  <input type="password" name="confirm_password" ref='confirm_password' placeholder={this.props.lang == 'en' ? 'Confirm:' : 'تؤكد'} />
                </div>
              </div>
              <button className="ui fluid large blue submit button" type='submit'>{this.props.lang == 'en' ? 'Sign up' : 'سجل'}</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Sign_up
