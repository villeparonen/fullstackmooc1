import React, { useState, useEffect } from 'react'
import { gql, useQuery, useLazyQuery  } from '@apollo/client'

const BOOKS_BY_GENRE = gql`
query GetGreeting($genre: String!) {
  allBooks(genre: $genre) {
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
}
`


const Books = (props) => {
  const [genre, setGenre] = useState("allback")

  if (!props.show || !props.all_books_data) {
    return null
  }

  if ( props.all_books_data.loading || !props.all_books_data ) {
    return <div>loading...</div>
  } else {

  const setgenres = (event) => {
    if(event != "allback") {
      let chosenGenre = event.target.innerHTML
      setGenre(chosenGenre)
    } else {
      setGenre("allback")
    }
  }


  // Get list of genres that contain one genre only once
  let genresShown = []
  props.all_books_data.data.allBooks.forEach(x => x.genres.forEach(y => !genresShown.includes(y) ? genresShown.push(y) : null
  //  books = props.all_books_data.data.allBooks.filter(x => x.genres.includes(genre))
  ))

  let books = props.all_books_data.data.allBooks
  

  if(genre != "allback") {
    books = props.all_books_data.data.allBooks.filter(x => x.genres.includes(genre))
  } 

  return (
    <>
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
          <th>
              Book title
            </th>
            <th>
              Author name
            </th>
            <th>
              Author born
            </th>
            <th>
              Year published
            </th>
            <th>
              Pages
            </th>
            <th>
              Reason for reading
            </th>
            <th>
              Date when finished
            </th>
            <th>
              Notes about book
            </th>
            <th>
              Genres
            </th>
          </tr>
          {books.map((a, i) =>
            <tr key={i}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.author.born}</td>
              <td>{a.published}</td>
              <td>{a.pages || "-"}</td>
              <td>{a.goal || "-"}</td>
              <td>{a.date || "-"}</td>
              <td>{a.notes || "-"}</td>
              {a.genres.map((g, u) => <td key={u}>{g}</td>)}
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div>
      {genresShown.length > 0 ? (<h4>Listed books belongs in all of these genres. Filter genres by selecting one</h4>) : null}
      {genre != "allback" ? (<div><button onClick={() => setgenres("allback")}><u>Show all books from all genres</u></button></div>) : null}
      <ul>
      {genresShown.map((g, u) => <li key={u} onClick={(event) => setgenres(event)}>{g}</li>)}
      </ul>
    </div>
    </>
  )
}}

export default Books