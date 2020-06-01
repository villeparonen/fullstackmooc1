
import React, { useState } from 'react'


const BlogForm = ({ createBlog }) => {
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')


    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }


    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>title: <input
                id='title'
                value={newTitle}
                onChange={handleTitleChange}
            /></div>
            <div>author: <input
                id='author'
                value={newAuthor}
                onChange={handleAuthorChange}
            /></div>
            <div>url: <input
                id='url'
                value={newUrl}
                onChange={handleUrlChange}
            /></div>
            <div><button type="submit">Create</button></div>
        </form>
    )
}


export default BlogForm