import React from 'react'
import { connect } from 'react-redux'
import { changeLanguage } from '../../actions/uiAction.js'

class LanguageSelect extends React.Component {
    constructor(props) {
        super(props)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    handleSelectChange(e) {
        e.preventDefault()
        let lang = this.refs['lang'].value
        console.log(lang)
        this.props.handleLanguageChange(lang)
    }
    render() {
        return (
            <div>
                    <select onChange={this.handleSelectChange} ref='lang'>
                        <option value='en' selected>English</option>
                        <option value='ar'>عربى</option>
                    </select>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({lang: state.ui.lang})
const mapDispatchToProps = (dispatch) => ({
    handleLanguageChange(lang) {
        dispatch(changeLanguage(lang))
    } 
})
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect)