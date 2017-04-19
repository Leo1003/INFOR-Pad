const router = require('koa-router')()

import React from 'react'
import { renderToString } from 'react-dom/server'

import { match, RouterContext } from 'react-router'
import routes from './routes.jsx'

import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'

import Immutable, { fromJS } from 'immutable'

router.get('*', (ctx, next) => {
  match({ routes: routes, location: ctx.url}, (err, redirect, props) => {
    if (err) {
     console.log(err.message)
   } else if (props) {

     const store = configureStore(fromJS({
       message: '',
     }))

     const appHtml = renderToString(
       <Provider store={store}>
         <RouterContext {...props}/>
       </Provider>
     )
     const preloadedState = store.getState()
     console.log(preloadedState)
     ctx.body = renderPage(appHtml, preloadedState)
   } else {
     return next()
   }
  })
})

function renderPage(appHtml, preloadedState) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Frontend Testing</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
        <script
    src="https://code.jquery.com/jquery-3.1.1.min.js"
    integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
    crossorigin="anonymous"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.js"></script>
    </head>
    <body>
      <div id="app">${appHtml}</div>
      <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
    <script type="text/javascript" src="index_bundle.js"></script></body>
  </html>
  `
}

module.exports = router
