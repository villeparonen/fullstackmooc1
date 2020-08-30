import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'

import { likeBlog, removeSelectedBlog, setUserAction, giveNotification } from './actions';
import { initializeBlogs } from './reducers'

import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import LogOut from './components/Logout'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import Users from './components/Users'
import ShowBlogs from './components/ShowBlogs'
import SpecificUser from './components/SpecificUser'
import BlogPage from './components/BlogPage'

import { Switch, Route, Link } from "react-router-dom"


const sortAsc = (obj) => {
  obj.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1
    } else {
      return -1
    }
  })
}

let navigationStyle = {
  border: '1px black dashed',
  backgroundColor: 'paleturquoise',
  margin: '5px',
  padding: '15px',
  listStyle: 'none'
}

let liStyle = {
  display: 'inline',
  margin: '0px 5px 0px 5px'
}

const App = (props) => {
  const blogFormRef = React.createRef()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [userText, setUserText] = useState("")
  const dispatch = useDispatch()
  
  // Request get all blogs to show at the start
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userasd = JSON.parse(loggedUserJSON)
      dispatch(setUserAction(userasd))
      blogService.setToken(userasd.token)
      welcome(userasd)
    }
  }, [dispatch])
  // Efektin parametrina oleva tyhjä taulukko varmistaa sen, että efekti suoritetaan ainoastaan kun komponentti renderöidään ensimmäistä kertaa.

  const welcome = (user) => {
    if(user) {
      const userText = `Welcome ${user.name}!`
      setUserText(userText)
    } else if(user==="") {
      const userText = ``
      setUserText(userText)
    }
  }

  const messageTimeout = (time) => {
    let seconds = time ? time : 5000
    setTimeout(() => {
      props.giveNotification(null)

    }, seconds)
  }

  console.log("initial state blogs", blogs)

  const removeBlog = async (blog) => {
    let confirm = window.confirm(`Remove selected blog with title: "${blog.title}"?`)
    if (confirm === true) {
      try {
        await blogService.remove(blog.id)
        let blogsAfterRemove = await blogService.getAll()
        sortAsc(blogsAfterRemove)
        dispatch(removeSelectedBlog(blogsAfterRemove))
        props.giveNotification('Selected item removed from list and whole list sorted to ascending likes order again')
        messageTimeout(10000)
      } catch (error) {
        console.error(error)
        if(error.response.status === 401) {
          props.giveNotification(`You are not authorised to remove this blog post. You can only remove items that you have created. `)
          messageTimeout(10000)      
        } else {
          props.giveNotification(`${error}`)
          messageTimeout(10000)      
        }
      }
    }
    return
  }

  const increaseLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedNote => {
        let newBlogsmap = blogs.map(note => note.id !== id ? note : returnedNote)
        dispatch(likeBlog(newBlogsmap))
      })
      .catch(error => {
        props.giveNotification(`${error}`)
        messageTimeout(10000)
      })
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />

      <Togglable buttonLabel='login' user={user}>
        <LoginForm messageTimeout={messageTimeout} giveNotification={props.giveNotification} welcome={welcome} />
      </Togglable>

      <div>
        <ul style={navigationStyle}>
          <li style={liStyle}><Link to="/">blogs</Link></li>
          <li style={liStyle}><Link to="/users">users</Link></li>
          <li style={liStyle}>{userText ? (<i>{userText} <LogOut welcome={welcome} /></i>) : null}</li>
        </ul>
      </div>
      <Switch>
        <Route path="/users/:id">
          <SpecificUser />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <BlogPage blogs={blogs} user={user} increaseLike={increaseLike} removeBlog={removeBlog} giveNotification={props.giveNotification} messageTimeout={messageTimeout} />
        </Route>
        <Route path="/">
          <ShowBlogs blogs={blogs} user={user} increaseLike={increaseLike} removeBlog={removeBlog} messageTimeout={messageTimeout} giveNotification={props.giveNotification} blogFormRef={blogFormRef} />
        </Route> 
      </Switch>
      <Footer />
      <LogOut welcome={welcome} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    message: state.message
  }
}

export default connect(mapStateToProps, { giveNotification })(App)