import React, { useState } from 'react'
import loginService from '../services/login'
import { connect } from 'react-redux';
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setUserAction } from '../actions';

import Button from '../styles'

const LoginForm = (props) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleUsernameChange = (event) => setUsername(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)

    const createLogin = async (username, password) => {
        try {
          const user = await loginService.login({
            username, password,
          })
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          )
          blogService.setToken(user.token)
          dispatch(setUserAction(user))
          props.giveNotification('Logged in')
          props.welcome(user)
        } catch (exception) {
          props.giveNotification('wrong credentials')
          props.messageTimeout(10000)
        }
      }

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
                <Button id="login-button" type="submit">login</Button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { user: state.user }
}

const mapDispatchToProps = { setUserAction }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)