import React from 'react'
import { connect } from 'react-redux'

class MoveFileModal extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props)
    }
    render() {
        return (
            <div className="ui small modal" id={this.props.file.id + '_moveModal'}>
                <div className="header">
                    Move
                </div>
                <div className="content">
                    Move Content
                </div>
                <div className="actions">
                    <div className="ui basic deny button">
                    Cancel
                    </div>
                    <button className="ui blue button" type="submit">Move</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    moveContent: state.ui.moveContent
})

const mapDispatchToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MoveFileModal)