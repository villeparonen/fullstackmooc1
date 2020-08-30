import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from "react-router-dom"

import { createComment } from '../actions';

import blogService from '../services/blogs'

import Button from '../styles'

const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    border: 'dashed',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 10
  }



const BlogPage = ({ blogs, increaseLike, removeBlog, user, giveNotification, messageTimeout }) => {
   const [comments, setComments] = useState([])
   const routeMatch = useRouteMatch('/blogs/:id')


useEffect(() => {
    const fetchData = async() => {
        try {
            const allcomments = await blogService.getAllComments(routeMatch.params.id)
            console.log("front end got all comments ", allcomments)
            setComments(allcomments)
        } catch(error) {
            console.error(error)
        }
    }
    fetchData()
  }, [])

  let chosenBlog = blogs

  if(Array.isArray(blogs)) {
    chosenBlog = routeMatch ? blogs.find(b => b.id === routeMatch.params.id) : null
    console.log("from blog page chosen blog ", chosenBlog)
  } 


  const createCommentF = (content) => {
    // Requst.body has to be json object
    let sendContent = {comment: content}

    blogService
      .createAnonymousComment(routeMatch.params.id, sendContent)
      .then(returnedBlog => {
        console.log("Front end: Returned comment from back end response", returnedBlog)
        let newComments = comments.concat(returnedBlog)
        setComments(newComments)
      })
      .catch(error =>
        giveNotification(`${error}`)).then(
        messageTimeout(7000)
        )
  }

  const addComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    if(content !== "") {
        createCommentF(content)
        event.target.comment.value = ""
    }
}

  return chosenBlog ? (
    <div style={blogStyle} className='blog'>
        <div><b>{chosenBlog.title}</b></div>
        <div><a href={chosenBlog.url}>{chosenBlog.url}</a></div>
        <div>{chosenBlog.likes} likes. <Button className='likesButton' onClick={() => increaseLike(chosenBlog.id)}>like</Button></div>
        <div>Added by {chosenBlog.author}</div>
        <br/>
        <div>If you have created this blog post, then as logged in author you can remove this blostpost by clicking this: <Button onClick={() => removeBlog(chosenBlog)}><u>remove</u></Button></div>
        <div>
            <h3>Give comments:</h3>
            <form onSubmit={addComment}>
                <div><input name="comment" />
                    <Button type="submit">add comment</Button>
                </div><br />
                <h2>Already published other comments:</h2>
                <ul>
                    {comments.map(i => {
                        return <li key={Math.floor(Math.random() * 238423)}>{i.comment}</li>
                    })}
                </ul>
            </form>
        </div>
    </div>
  ) : null

}

const mapDispatchToProps = { createComment }
export default connect(null, mapDispatchToProps)(BlogPage)
