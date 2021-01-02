
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommended from './components/Recommended'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { gql, useQuery, useMutation, useApolloClient, useSubscription  } from '@apollo/client'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}


const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name,
    bookCount,
		born,
		id,
    books {
		title,
    id,
		genres
		}
  }
}
`



const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title,
  published,
  author{
  name,
  id,
  born,
  bookCount
  },
  pages,
  goal,
  genres,
  date,
  notes,
  id
}
`

const ALL_BOOKS = gql`
query {
  allBooks  {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
`


const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $pages: Int!, $goal: String!, $date: String!, $notes: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author, 
      published: $published,
      pages: $pages,
      goal: $goal,
      date: $date,
      notes: $notes,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      pages
      goal
      genres
    }
  }
`

const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: String!) {
    editAuthor(name: $name, born: $setBornTo)  {
      name
      born
    }
  }
`

const USER_INFO = gql`
query {
  me {
username
favoriteGenre
}
}
`


const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const user_info = useQuery(USER_INFO)

  const all_authors_data = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const all_books_data = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  const [ createBook ] = useMutation(CREATE_BOOK)
  const [ editAuthor ] = useMutation(EDIT_BIRTHYEAR)
  const [page, setPage] = useState('authors')
  const [storagedToken, setStoragedToken] = useState(localStorage.getItem('user-token'))

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("subscriptionData", subscriptionData)
      window.alert(`New book called: "${subscriptionData.data.bookAdded.title}" Just added to collections`);
    }
  })

  if (all_books_data.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    console.log("logout")
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setStoragedToken(null)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // Get list of genres that contain one genre only once
  const filteredData = () => {
    let genresShown = []
    all_books_data.data.allBooks.forEach(x => x.genres.forEach(y => !genresShown.includes(y) ? genresShown.push(y) : null
    //  books = props.all_books_data.data.allBooks.filter(x => x.genres.includes(genre))
    ))
    return genresShown
  }


  if (!token && !storagedToken) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors all_authors_data={all_authors_data} show={page === 'authors'} editAuthor={editAuthor} />

      <Books all_books_data={all_books_data} show={page === 'books'} />

      <Recommended genresShown={filteredData()} user_info={user_info} show={page === 'recommended'} />

      <NewBook show={page === 'add'} createBook={createBook} />

    </div>
  )
}

export default App