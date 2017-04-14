const Koa = require('koa')
const app = new Koa();
const router = require('koa-router')()

import React from 'react'
import { renderToString } from 'react-dom/server'

import { match, RouterContext } from 'react-router'
import routes from './routes.jsx'

router.get('*', (ctx, next) => {
  match({ routes: routes, location: ctx.url}, (err, redirect, props) => {
    if (err) {
     console.log(err.message)
   } else if (props) {
     const appHtml = renderToString(<RouterContext {...props}/>)
     ctx.body = renderPage(appHtml)
   } else {
     return next()
    //ctx.body = 'Not Found Jizz'
   }
  })
})

function renderPage(appHtml) {
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
    <script type="text/javascript" src="index_bundle.js"></script></body>
  </html>
  `
}

module.exports = router
