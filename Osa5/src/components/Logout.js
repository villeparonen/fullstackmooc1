

import React from 'react'
import blogService from '../services/blogs'

const Logout = ({ user, setUser }) => {
    if (user === null) {
        return null
    }

    const logOutF = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        blogService.setToken(null)
        setUser(null)
    }

    return (
        <div className="error">
            <button onClick={logOutF}>Logout by licking this</button>
        </div>
    )
}

export default Logout