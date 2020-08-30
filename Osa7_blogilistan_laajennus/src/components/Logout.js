

import React from 'react'
import blogService from '../services/blogs'
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import { LogOutUserAction } from '../actions';

import Button from '../styles'


const Logout = ({user, welcome}) => {
    const dispatch = useDispatch()

    if (!user) {
        return null
    }

    console.log("logout test user: ", user)
    const logOutF = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        blogService.setToken(null)
        dispatch(LogOutUserAction)
        welcome("")
    }

    return (
        <i className="error">
            <Button onClick={logOutF}>Logout</Button>
        </i>
    )
}

const mapStateToProps = (state) => {
    return { user: state.user }
}

const mapDispatchToProps = { LogOutUserAction }

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
