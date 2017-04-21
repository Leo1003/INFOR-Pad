import 'whatwg-fetch'
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
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
        return res.json()
        .then(json => {
          dispatch({ type: SIGN_IN_SUCCESS, payload: { data: json } });
        })
      }
      else if(res.status == 403) {
        dispatch({ type: SIGN_IN_FAIL})
      }
    })
    .catch(err => { console.log(err) })
  }
)

export const signUp = (formData) => (
  (dispatch) => {
    fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${formData.username}&password=${formData.password}&email=${formData.email}`,
      credentials: 'include'
    }).then(res => {
      if(res.ok) {
        dispatch({ type: SIGN_UP_SUCCESS })
      }
      else if(res.status == 409) {
        //this.setState({'message': 'Username Already Used'})
        dispatch({ type: SIGN_UP_FAIL })
      }
    }).catch(err => { console.log(err) })
  }
)
