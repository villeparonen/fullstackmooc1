import React from 'react'
import { connect } from 'react-redux';

let dviStyle = {
    color: 'green'
}
let errorStyle = {
    color: 'red'
}
let selectedStyle;

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

        console.log("message notification", message)

    if (message.split(':')[0] === 'Error' || message === 'wrong credentials') {
        selectedStyle = errorStyle
    } else {
        selectedStyle = dviStyle
    }

    return (
        <div style={selectedStyle}>
            {message}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { message: state.message }
}


export default connect(mapStateToProps)(Notification);