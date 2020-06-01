import React, { useState } from 'react'
// import blogService from '../services/blogs'
// import loginService from '../services/login'

const LoginForm = ({
    createLogin
}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => setUsername(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)


    const handleLogin = async (event) => {
        event.preventDefault()
        createLogin(username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>username<input
                    id='username'
                    value={username}
                    onChange={handleUsernameChange}
                />
                </div>
                <div>password<input
                    id='password'
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm