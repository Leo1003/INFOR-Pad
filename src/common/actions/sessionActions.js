require('isomorphic-fetch');
import cookie from 'react-cookie'

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  GET_INITIAL_SESSION,
  CLEAN_SESSION,
  CLEAN_USER,
  CLEAN_FILE,
  CLEAN_FOLDER,
  ISFETCHING,
  DIDFETCH,
  GET_INITIAL_USER,
  LOGIN_FIRST

} from '../constants/actionTypes'
import { browserHistory } from 'react-router'
// import { fetchGetInitialUser } from './userActions'

export const fetchSignIn = (formData, autologin) => (
  async (dispatch) => {
    try {
      let res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${formData.username}&password=${formData.password}&autoLogin=${autologin}`,
        credentials: 'include'
      })
      if(res.ok) {
        let json = await res.json()
        dispatch({ type: SIGN_IN_SUCCESS, payload: { data: json } })
        //dispatch(fetchGetInitialUser(json.sessionid))
        dispatch(GetInitialSession())
      }
      else if(res.status == 403) {
        dispatch({ type: SIGN_IN_FAIL })
      }
    } catch(e) { console.log(e) }
  }
)


export const fetchLogout = (sessionid) => (
  async (dispatch) => {
    try {
      dispatch({ type: ISFETCHING })
      let res = await fetch("/api/session", {
        method: 'DELETE',
        headers: {
          'sessionid': `${sessionid}`
        }
      })
      dispatch({ type: CLEAN_SESSION })
      dispatch({ type: CLEAN_USER })
      dispatch({ type: CLEAN_FILE })
      dispatch({ type: CLEAN_FOLDER })
      browserHistory.replace({ pathname: '/' })
      dispatch({ type: DIDFETCH })
    } catch(e) { console.log(e) }
  }
)

export const fetchSignUp = (formData) => (
  async (dispatch) => {
    try {
      let res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${formData.username}&password=${formData.password}&email=${formData.email}`,
        credentials: 'include'
      })
      if(res.ok) {
        let json = await res.json()
        //dispatch({ type: SIGN_UP_SUCCESS, payload: { data: json } })
        dispatch(fetchSignIn(formData))
      } else if(res.status == 409) {
        let json = await res.json()
        dispatch({ type: SIGN_UP_FAIL , payload: { data: json }})
      }
    } catch(e) { console.log(e) }
  }
)

export const GetInitialSession = () => (
  async (dispatch) => {
    dispatch({ type: ISFETCHING })
    // dispatch({ type: GET_INITIAL_SESSION })
     const sessionid = cookie.load('sessionid')
     if(sessionid) {
       let res = await fetch('/api/session', {
         method: "GET",
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'sessionid': `${sessionid}`
         }
       })
       if(res.ok) {
         let json = await res.json()
         dispatch({ type: GET_INITIAL_SESSION })
         dispatch({ type: GET_INITIAL_USER, payload: { data: json } })
       } else if(res.status == 401) dispatch({ type: LOGIN_FIRST })
     } else {
       dispatch({ type: CLEAN_SESSION })
       dispatch({ type: CLEAN_USER })
       dispatch({ type: CLEAN_FILE })
       dispatch({ type: CLEAN_FOLDER })
     }
    dispatch({ type: DIDFETCH })
  }
)
