// import { handleActions } from 'redux-actions'
// import {
//   GET_INITIAL
// } from '../../constants/actionTypes'
// import { session, user } from '../../constants/models.js'
// import cookie from 'react-cookie'
// import { browserHistory } from 'react-router'
//
// const userReducers = handleActions({
//   GET_INITIAL: (state, { payload }) => {
//     console.log("userReducer")
//     console.log(state)
//     let tmpstate = Object.assign({}, state.user, {
//       name: payload.data.user.name,
//       level: payload.data.user.level,
//       createDate: payload.data.user.createDate,
//       email: payload.data.user.email,
//       lastLogin: payload.data.user.lastLogin,
//       rootfsid: payload.data.user.rootfsid
//     })
//     let tmpstate2 = Object.assign({}, state.session, {
//
//     })
//     return Object.assign()
//   }
// }, { session, user })
//
// export default userReducers
