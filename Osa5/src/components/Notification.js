import React from 'react'

let dviStyle = {
    color: 'green'
}

let errorStyle = {
    color: 'red'
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.split(':')[0] === 'Error' || message === 'wrong credentials') {
        dviStyle = errorStyle
    }

    return (
        <div className="error" style={dviStyle}>
            {message}
        </div>
    )
}

export default Notification