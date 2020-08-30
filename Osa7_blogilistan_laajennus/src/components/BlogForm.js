
import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { createBlogs } from '../actions';
import blogService from '../services/blogs'

const BlogForm = (props) => {
    const dispatch = useDispatch()

    const createBlog = (blogObject) => {
        // blogFormRef.current.toggleVisibility()
        blogService
          .create(blogObject)
          .then(returnedBlog => {
            console.log("RETURNED BLOG", returnedBlog)
            dispatch(createBlogs(returnedBlog))
            props.giveNotification('New blog created')
            props.messageTimeout(10000)
          }).catch(error =>
            props.giveNotification(`${error}`)).then(
              props.messageTimeout(7000)
            )
      }

    const addBlog = (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        const contentObj = {
            title: title,
            author: author,
            url: url,
            likes: 0
        }
        createBlog(contentObj)
        event.target.title.value = ""
        event.target.author.value = ""
        event.target.url.value = ""
    }

    return (
        <div>
            <h2>create new blog</h2>
            <form onSubmit={addBlog}>
                <div>Title: <input name="title" />
                    Author: <input name="author" />
                    Url: <input name="url" />
                    <button type="submit">create</button></div><br />
            </form>
        </div>
    )
}

const mapDispatchToProps = { createBlogs }
export default connect(null, mapDispatchToProps)(BlogForm)