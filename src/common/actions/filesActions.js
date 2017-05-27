require('isomorphic-fetch');

import {
  GET_FOLDER,
  GET_FILE,
  LOGIN_FIRST,
  PERMISSION_DENIED,
  FILE_IS_NOT_EXIST,
  DELETE_FILE,
  ISFETCHING,
  DIDFETCH,
  GET_SHORTID,
  INITIALREDIRECT,
  CLEAN_SESSION,
  FILE_RENAME,
  FILE_UPDATE_DES,
  CHANGE_MOVE_CONTENT,
  CHANGE_FOLDER_MODAL,
  FILE_UPDATE_LAN,
  MODIFY_FILE,
  ADD_NEW_FILE,
  REDIRECT_ERROR
} from '../constants/actionTypes'
import { browserHistory } from 'react-router'

export const fetchGetFiles = (sessionid, fsid, format) => (
  async (dispatch) => {
    try {
      dispatch({ type: ISFETCHING })
      let res = await fetch(`/api/fs/${fsid}`, {
        method: 'GET',
        headers: {
          'sessionid': `${sessionid}`
        }
      })
      if (res.ok) {
        let json = await res.json()
        if(json.format === "Directory" && format === 'Directory') dispatch({ type: GET_FOLDER, payload: { data: json } })
        else if(json.format !== "Directory" && format === 'File') dispatch({ type: GET_FILE, payload: { data: json } })
        else {
          dispatch({ type: FILE_IS_NOT_EXIST})
        }
      } else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST} )
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
      dispatch({ type: DIDFETCH })
    } catch(e) { console.log(e) }
  }
)

export const fetchAddNewFiles = (filename, folderid, sessionid, format, description) => (
  async (dispatch) => {
    try {
      let res = await fetch(`/api/fs/${folderid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
        },
        body: `filename=${encodeURIComponent(filename)}&format=${format}&description=${encodeURIComponent(description)}`
      })
      if(res.ok){
        let json = await res.json()
        dispatch({ type: ADD_NEW_FILE, payload: { data: json } })
      }  else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST })
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
    } catch(e) { console.log(e) }
  }
)

export const fetchUpLoadFiles = (filename, folderid, sessionid, format, description, code) => (
  async (dispatch) => {
    try {
      let res = await fetch(`/api/fs/${folderid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
        },
        body: `filename=${encodeURIComponent(filename)}&format=${format}&description=${encodeURIComponent(description)}&code=${encodeURIComponent(code)}`
      })
      if(res.ok){
        let json = await res.json()
        dispatch({ type: ADD_NEW_FILE, payload: { data: json } })
      }  else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST })
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
    } catch(e) { console.log(e) }
  }
)

export const fetchFastSubmit = (filename, format, description, code) => (
  async (dispatch) => {
    try {
      // console.log(code)
      let res = await fetch(`/api/fs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `filename=${encodeURIComponent(filename)}&format=${format}&description=${encodeURIComponent(description)}&code=${encodeURIComponent(code)}`
      })
      if(res.ok){
        let json = await res.json()
        // console.log(json)
        browserHistory.push(`/pad/file/${json.id}`)
      } else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST })
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
    } catch(e) { console.log(e) }
  }
)

export const fetchDeleteFile = (fsid, sessionid, folderid) => (
  async (dispatch) => {
    try {
      let res = await fetch(`/api/fs/${fsid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
        }
      })
      if(res.ok) {
        let json = await res.json()
        dispatch(fetchGetFiles(sessionid, folderid, 'Directory'))
      } else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST })
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
    } catch(e) { console.log(e) }
  }
)

export const fetchCheckPermission = (fsid, sessionid, check) => (
  async (dispatch) => {
    try {
      // console.log(check)
      
      let res = await fetch(`/api/fs/${fsid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
        },
        body: `isPublic=${check}`
      })
      if(res.ok) {
        let json = await res.json()
        dispatch({ type: GET_SHORTID, payload:{ data: json } })
        dispatch({ type: CHANGE_FOLDER_MODAL, file: json })
      } else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST })
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
    } catch(e) { console.log(e) }
  }
)

export const fetchTransferShortID = (shortid) => (
  async (dispatch) => {
    try {
      dispatch({ type: ISFETCHING })
      let res = await fetch(`/api/fs/?shortid=${shortid}`, {
        method: 'GET'
      })
      if(res.ok) {
        let json = await res.json()
        if(json.format === 'Directory') browserHistory.replace(`/pad/folder/${json.id}`)
        else browserHistory.replace(`/pad/file/${json.id}`)
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
      dispatch({ type: DIDFETCH })
    } catch(e) { console.log(e) }
  }
)

export const initialRedirect = () => (
  (dispatch) => {
    dispatch({ type: INITIALREDIRECT })
  }
)

export const fetchModifyFile = (sessionid, fsid, newType, newVal) => (
  async (dispatch) => {
    try {
      let res = await fetch(`/api/fs/${fsid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
        },
        body: `${newType}=${newVal}`
      })
      if(res.ok) {
        dispatch({ type: MODIFY_FILE, fsid: fsid, newType: newType, newVal: newVal})
      }
      //todo: res not ok
      else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST })
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
    } catch(e) { console.log(e) }
  }
)

export const fetchMoveContent = (sessionid, fsid) => (
    async (dispatch) => {
        try {
            let res = await fetch(`/api/fs/${fsid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'sessionid': `${sessionid}`
                }
            })
            if(res.ok) {
                let json = await res.json()
                dispatch({ type: CHANGE_MOVE_CONTENT, payload: { data:json } })
            }
            //todo res error
            else if(res.status == '401') {
              dispatch({ type: CLEAN_SESSION })
              dispatch({ type: LOGIN_FIRST })
            } else {
              let json = await res.json()
              dispatch({ type: REDIRECT_ERROR, error: json.error })
            }
        } catch(e) { console.log(e) }
    }
)

export const fetchMoveFile = (sessionid, fsid, tfsid, folderid) => (
  async (dispatch) => {
    try {
      let res = await fetch(`/api/fs/${fsid}/${tfsid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'sessionid': `${sessionid}`
        }
      })
      if(res.ok) {
        //todo
        dispatch(fetchGetFiles(sessionid, folderid, 'Directory'))
      }
      //todo res error
      else if(res.status == '401') {
        dispatch({ type: CLEAN_SESSION })
        dispatch({ type: LOGIN_FIRST })
      } else {
        let json = await res.json()
        dispatch({ type: REDIRECT_ERROR, error: json.error })
      }
    } catch(e) { console.log(e) }
  }
)

export const changeFolderModal = (file) => (
  (dispatch) => {
    dispatch({ type: CHANGE_FOLDER_MODAL , file: file })
  }
)