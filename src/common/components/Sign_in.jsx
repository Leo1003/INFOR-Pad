import React from 'react'
import { browserHistory } from 'react-router'
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
        <div className="ui negative message">
          <div class="header">{this.props.error_message}</div>
        </div>
      )
    }
    return (
      <div className="ui middle aligned center aligned grid" style={{height: "90vh"}}>
        <div className="column">
          <h1 className="ui black header">{'INFOR-Pad ' + (this.props.lang == 'en' ? 'Sign In' : 'تسجيل الدخول')}</h1>
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
                  <i className="privacy icon"></i>
                  <input type="password" name="password" ref='password' placeholder={this.props.lang == 'en' ? 'Password:' : 'كلمه السر'} />
                </div>
              </div>
              <div className="field">
                  <div className="ui checkbox">
                    <input type="checkbox" name="autologin" ref='autologin'/>
                    <label>{this.props.lang == 'en' ? 'Remember me' : 'تذكرنى'}</label>
                  </div>
              </div>
              <button className="ui fluid large blue submit button" type='submit'>تسجيل الدخول</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default Sign_in
