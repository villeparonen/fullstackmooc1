import React from 'react'


const Notification = ({ message, errorMessage }) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message) {
        return (
            <div style={notificationStyle}>
                <h3>{message}</h3>
            </div>
        )
    } else if (errorMessage) {
        return (
            <div style={errorStyle}>
                <h3>{errorMessage}</h3>
            </div>
        )
    } else {
        return null
    }

}

export default Notification