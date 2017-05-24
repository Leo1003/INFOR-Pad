import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { fetchTransferShortID } from '../actions/filesActions'

class sharePage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.handleTransferShortID(this.props.params.shortid)
  }
  render() {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  handleTransferShortID(shortid) {
    dispatch(fetchTransferShortID(shortid))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(sharePage)
