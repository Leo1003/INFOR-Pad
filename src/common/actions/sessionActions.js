import 'whatwg-fetch'
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  GET_INITIAL_SESSION,
  LOGOUT
} from '../constants/actionTypes'

export const fetchSignIn = (formData) => (
  (dispatch) => {
    fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${formData.username}&password=${formData.password}`,
      credentials: 'include'
    })
    .then(res => {
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


export const fetchLogout = (sessionid) => (
  (dispatch) => {
    fetch("/api/session", {
      method: 'DELETE',
      headers: {
        'sessionid': `${sessionid}`
      }
    })
    .then(res => {
      if(res.ok) {
        dispatch({ type: LOGOUT })
      }
    }).catch(err => { console.log(err) })
  }
)

export const fetchSignUp = (formData) => (
  (dispatch) => {
    fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${formData.username}&password=${formData.password}&email=${formData.email}`,
      credentials: 'include'
    })
    .then(res => {
      if(res.ok) {
        dispatch({ type: SIGN_UP_SUCCESS })
      }
      else if(res.status == 409) {
        dispatch({ type: SIGN_UP_FAIL })
      }
    })
    .catch(err => { console.log(err) })
  }
)

export const GetInitialSession = (sessionid) => (
  (dispatch) => {
    dispatch({ type: GET_INITIAL_SESSION })
  }
)
