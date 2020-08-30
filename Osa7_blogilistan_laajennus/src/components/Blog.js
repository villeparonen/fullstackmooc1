import React, { useState } from 'react'

import { Link } from "react-router-dom"

import Button from '../styles'

const Blog = ({ blog, increaseLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    border: 'dashed',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 10
  }
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div><b><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> </b> <i>{blog.author} </i><Button onClick={toggleVisibility}>View</Button></div>
      <div style={showWhenVisible} className='hiddenBlog'>
        <div>{blog.url}</div>
        <div><i className='likes'>{blog.likes}</i><Button className='likesButton' onClick={() => increaseLike(blog.id)}>like</Button></div>
        <div><Button onClick={() => removeBlog(blog)}><u>remove</u></Button></div>
      </div>
    </div>
  )
}



export default Blog
