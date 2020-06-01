import React, { useState } from 'react'

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
  const [showRemove, setRemove] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <div style={blogStyle} className='blog'>
      <div><b>{blog.title} </b> <i>{blog.author} </i><button onClick={toggleVisibility}>View</button></div>
      <div style={showWhenVisible} className='hiddenBlog'>
        <div>{blog.url}</div>
        <div><i className='likes'>{blog.likes}</i><button className='likesButton' onClick={() => increaseLike(blog.id)}>like</button></div>
        <div><button onClick={() => removeBlog(blog)}><u>remove</u></button></div>
      </div>
    </div>
  )
}

export default Blog
