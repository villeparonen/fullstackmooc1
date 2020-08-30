import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { Link, useRouteMatch } from "react-router-dom"

import usersService from '../services/users'

import Button from '../styles'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@material-ui/core'


const SpecificUser = (props) => {
    const [person, setPerson] = useState([])

    const routeMatch = useRouteMatch('/users/:id')

    useEffect(() => {
        const fetchData = async() => {
            try {
                
                const allusers = await usersService.getAllUsers()
                const oneuser = routeMatch ? allusers.find(note => note.id === routeMatch.params.id) : null
                setPerson(oneuser)
            } catch(error) {
                console.error(error)
            }
        }
        fetchData()
      }, [])

    if(typeof person === "undefined" || person === null || person.length === 0) {
        return null
    } else {
        if(person.blogs.length===0) {
            return(
                <div>
                    <h3>Users</h3>
                    <button onClick={props.setter3}><Link to={`/users/`}>Back to all users</Link></button>
                    <h2>Chosen author: <u>{person.name}</u></h2>
                    <h2>This user doesnt have any blogs posted yet!</h2>
                </div>
            )
        }
          
        return (
        <div>
            <h2>Users</h2>
            <Button onClick={props.setter3}><Link to={`/users/`}>Back to all users</Link></Button>
            <h2>Chosen author: <u>{person.name}</u></h2>
            <h2>Added blog titles and likes:</h2>
            <TableContainer component={Paper}>
                <Table>
                <TableBody>
                    {person.blogs.map(b => (
                    <TableRow key={b.id}>
                        <TableCell>
                        {b.title}
                        </TableCell>
                        <TableCell>
                        {b.likes}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    }
}


export default connect(null)(SpecificUser);