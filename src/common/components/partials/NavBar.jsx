import React from 'react'
import { connect } from 'react-redux'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router'
import Logout_Container from '../../containers/Logout_Container.js'
import LanguageSelect from './LanguageSelect.jsx'
import cookie from 'react-cookie'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Menu secondary inverted style={{background: '#1b1c1d', margin: '0'}}>
          <div className="item" style={{ margin: '0'}}>
            <Link to='/'><h3>INFOR PAD</h3></Link>
          </div>
            {
              this.props.isLogin === false ?
              (
                <Menu.Menu position='right'>
                  <div className="item" style={{ margin: '0'}}>
                    <Link to='/Sign_in'><div className="ui button inverted" style={{ margin: '0'}}>{this.props.lang == 'en' ? 'Sign In' : 'تسجيل الدخول'}</div></Link>
                  </div>
                  <div className="item" style={{ margin: '0'}}>
                    <Link to='/Sign_up'><div className="ui button inverted" style={{ margin: '0'}}>{this.props.lang == 'en' ? 'Sign Up' : 'سجل'}</div></Link>
                  </div>
                </Menu.Menu>
              ):
              (
                <Menu.Menu position='right'>
                  <div className="item" style={{ margin: '0'}}>
                    <Link><div className="ui button inverted" style={{ margin: '0'}}>{this.props.name}</div></Link>
                  </div>
                  <Logout_Container />
                </Menu.Menu>
              )
            }
            <LanguageSelect/>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    lang: state.ui.lang
  }
)

const mapDispatchToProps = (dispatch) => { {} }
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
