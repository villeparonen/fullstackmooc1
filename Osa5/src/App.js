import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import LogOut from './components/Logout'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const sortAsc = (obj) => {
  obj.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1
    } else {
      return -1
    }
  })
}



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()


  // Request get all blogs to show at the start
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        // Sort blogs order by likes ascending
        sortAsc(initialBlogs)
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  // Efektin parametrina oleva tyhjä taulukko varmistaa sen, että efekti suoritetaan ainoastaan kun komponentti renderöidään ensimmäistä kertaa.

  const messageTimeout = (time) => {
    let seconds = time ? time : 5000
    setTimeout(() => {
      setMessage(null)
    }, seconds)
  }

  const removeBlog = async (blog) => {
    let confirm = window.confirm(`Remove selected blog with title: "${blog.title}"?`)
    if (confirm === true) {
      try {
        await blogService.remove(blog.id)
        let blogsAfterRemove = await blogService.getAll()
        sortAsc(blogsAfterRemove)
        setBlogs(blogsAfterRemove)
        setMessage('Selected item removed from list and whole list sorted to ascending likes order again')
        messageTimeout(10000)
      } catch (error) {
        console.error(error)
        setMessage(`${error}`)
        messageTimeout()
      }
    }
    return
  }

  const increaseLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('changedBlog', changedBlog)

    blogService
      .update(id, changedBlog)
      .then(returnedNote => {
        setBlogs(blogs.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setMessage(
          `${error}`
        )
        messageTimeout()
      })
  }

  /// TODO: Use later?
  // const toggleImportanceOf = (id) => {
  //   const blog = blogs.find(n => n.id === id)
  //   const changedBlog = { ...blog, important: !blog.important }

  //   blogService
  //     .update(id, changedBlog)
  //     .then(returnedNote => {
  //       setBlogs(blogs.map(note => note.id !== id ? note : returnedNote))
  //     })
  //     .catch(error => {
  //       setMessage(
  //         `${error}`
  //       )
  //       messageTimeout()
  //     })
  // }

  const createLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      // talletetaan palvelimen vastaus (joka sisältää tokenin sekä kirjautuneen käyttäjän tiedot) sovelluksen tilaan user
    } catch (exception) {
      setMessage('wrong credentials')
      // Jos kirjautuminen epäonnistuu, eli funktion loginService.login suoritus aiheuttaa poikkeuksen, ilmoitetaan siitä käyttäjälle.
      messageTimeout()
    }
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage('New blog created')
      }).catch(error =>
        setMessage(
          `${error}`
        )).then(
          messageTimeout(7000)
        )
  }

  const blogsToShow = showAll ? blogs : blogs.filter(blog => blog.likes >= 10)

  return (
    <div>
      <h1>blogs</h1>

      <Notification message={message} />

      <Togglable buttonLabel='login'>
        <LoginForm createLogin={createLogin} />
      </Togglable>


      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>



      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'blogs that got 10 or more likes' : 'all'}
        </button>
      </div>
      <ul>
        {blogsToShow.map((blog, i) =>
          <Blog
            key={i}
            blog={blog}
            user={user}
            // toggleImportance={() => toggleImportanceOf(blog.id)}
            increaseLike={increaseLike}
            removeBlog={removeBlog}
          />
        )}
      </ul>

      <Footer />
      <LogOut user={user} setUser={setUser} />
    </div>
  )
}

export default App