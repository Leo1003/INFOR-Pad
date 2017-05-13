import React from 'react'
import { Link } from 'react-router'

const PermissionDenied = () => (
  <div className="ui container">
    <h1>Permission Denied</h1>
    <Link to="/">return Home</Link>
  </div>
)

export default PermissionDenied
