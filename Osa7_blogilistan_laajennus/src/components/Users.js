import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useSelector } from 'react-redux'
import usersService from '../services/users'
import SpecificUser from './SpecificUser'

import { Link } from "react-router-dom"


let tableStyle = {
    color: 'black',
    border: '1px black dashed',
    margin: '5px',
    padding: '15px'
}

let tableStyle1 = {
    color: 'black',
    textDecoration: 'underline blue',
    border: '2px lightblue dashed',
    margin: '5px',
    padding: '15px'
}

let tableStyle2 = {
    color: 'black',
    border: '2px lightblue dashed',
    margin: '5px',
    padding: '15px'
}


const Users = () => {
    const [allUsers, setallUsers] = useState([])
    const [showUsers, setShowUsers] = useState(false)
    const [showPerson, setSinglePerson] = useState("")
    const user = useSelector(state => state.user)


    useEffect(() => {
        const fetchData = async() => {
            try {
                const allusers = await usersService.getAllUsers()
                setallUsers(allusers)
                console.log("Initial useEffect fetch of all users from Users components", allusers)
            } catch(error) {
                console.error(error)
            }
        }
        fetchData()
      }, [])

    const setter2 = (person) => {
        setSinglePerson(person)
        setShowUsers(!showUsers)
    }

    const setter3 = (person) => {
        setSinglePerson("")
        setShowUsers(!showUsers)
    }

    if(!user) {
        return null
    }

    if(showPerson !== "") {
        return (
            <SpecificUser setter3={setter3} />
        )
    }

    return (
    <div>
        <h3>Users</h3>
        <table style={tableStyle}>
        <thead>
            <tr>
            <td><b>Name</b></td>
            <td><b>Blogs created</b></td>
            </tr>
        </thead>
            <tbody>
            {allUsers.map((blog, i) =>
            <tr key={blog.id} >
                <td style={tableStyle1} onClick={() => setter2(blog)}><Link to={`/users/${blog.id}`}>{blog.name}</Link></td>
                <td style={tableStyle2}>{blog.blogs.length}</td>
            </tr>
            )}
            </tbody>
        </table>
    </div>
    )
}

// const mapStateToProps = (state) => {
//     return { user: state.user }
// }


export default connect(null)(Users);