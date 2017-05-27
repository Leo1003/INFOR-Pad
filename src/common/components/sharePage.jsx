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
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching && nextProps.redirectToError) browserHistory.replace({pathname: '/error'})
  }
  render() {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.ui.isFetching,
  redirectToError: state.ui.redirectToError
})
const mapDispatchToProps = (dispatch) => ({
  handleTransferShortID(shortid) {
    dispatch(fetchTransferShortID(shortid))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(sharePage)
