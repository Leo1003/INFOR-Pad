import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

const errorPage = ({error}) => (
  <div className="ui container">
    <h1>{error}</h1>
    {error.length > 0 ? <Link to="/">return home</Link> : null}
  </div>
)

const mapStateToProps = (state) => ({
  error: state.ui.error
})

export default connect(mapStateToProps)(errorPage)
