import 'whatwg-fetch'
import {
  SIGN_UP,
  LOGOUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL
} from '../constants/actionTypes'

export const signIn = (formData) => (
  (dispatch) => {
    fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${formData.username}&password=${formData.password}`,
      credentials: 'include'
    }).then(res => {
      if(res.ok) {
        //console.log("Login Successful");
        return res.json()
        .then(json => {
          dispatch({ type: SIGN_IN_SUCCESS, payload: { data: json } });
          // fetchData['name'] = json.name;
          // fetchData['sessionid'] = json.sessionid;
          // //console.log(fetchData)
          // cookie.save('sessionid', json.sessionid, { path: '/' })
          // browserHistory.push('/')
        })
      }
      else if(res.status == 403) {
        dispatch({ type: SIGN_IN_FAIL})
        //this.setState({'message': 'Login Fail'})
      }
    })
    .catch(err => { console.log(err) })
  }
)

export default signIn
