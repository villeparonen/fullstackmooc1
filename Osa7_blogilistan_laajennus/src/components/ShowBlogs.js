import React, { useState } from 'react'
import { connect } from 'react-redux';
// import usersService from '../services/users'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import Button from '../styles'

import {
    Table,
    TableBody,
    TableContainer,
    Paper,
  } from '@material-ui/core'

const ShowBlogs = (props) => {
    const [showAll, setShowAll] = useState(true)

    const blogsToShow = showAll ? props.blogs : props.blogs.filter(blog => blog.likes >= 10)


    return (
        <>
        <div>
            <h2>Blogs</h2>

            <div>
                <Togglable buttonLabel="new blog" ref={props.blogFormRef}>
                    <BlogForm messageTimeout={props.messageTimeout} giveNotification={props.giveNotification} />
                </Togglable>
                <Button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'blogs that got 10 or more likes' : 'all'}
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                    {blogsToShow.map((blog, i) =>
                        <Blog
                            key={i}
                            blog={blog}
                            user={props.user}
                            // toggleImportance={() => toggleImportanceOf(blog.id)}
                            increaseLike={props.increaseLike}
                            removeBlog={props.removeBlog}
                        />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

            {/* <div>
            <ul>
            {blogsToShow.map((blog, i) =>
            <Blog
                key={i}
                blog={blog}
                user={props.user}
                // toggleImportance={() => toggleImportanceOf(blog.id)}
                increaseLike={props.increaseLike}
                removeBlog={props.removeBlog}
            />
            )}
        </ul>
        </div> */}
      </>
    )
}

// const mapStateToProps = (state) => {
//     return { user: state.user }
// }


export default connect(null)(ShowBlogs);