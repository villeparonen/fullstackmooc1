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



const Recommended = (props) => {
  const [genre, setGenre] = useState("all")
  const [dataBySelectedGenre, { loading, data }] = useLazyQuery(
    BOOKS_BY_GENRE,
    { variables: { genre: genre },
    fetchPolicy: "cache-and-network" }
  );
    // cache policies explained https://medium.com/@galen.corey/understanding-apollo-fetch-policies-705b5ad71980
  if (!props.show) {
    return null
  }


  const setgenres = (event) => {
    if(event) {
      let chosenGenre = event.target.innerHTML
      setGenre(chosenGenre)
      dataBySelectedGenre()
    } else {
      setGenre(props.user_info.data.me.favoriteGenre)
      dataBySelectedGenre()
    }
  }


  let books = []
  

  if(data && data.allBooks) {
    books = data.allBooks
  
  return (
    <>
    <div>
      <h2>Recommended readings</h2>

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
      {props.genresShown.length > 0 ? (<h4>List of all genres. Filter genres by selecting one</h4>) : null}
      <ul>
      {props.genresShown.map((g, u) => <li key={u} onClick={(event) => setgenres(event)}>{g}</li>)}
      </ul>
      <button onClick={() => setgenres()}>Get recommended books from your favorite genre by clicking this</button>
    </div>
    </>
  )
} else {
  return (
  <div>
    <h2>Recommended readings</h2>
    <h3>Our database tells that your favorite genre is: {props.user_info.data.me.favoriteGenre ? props.user_info.data.me.favoriteGenre : "not set"}</h3>
    <p>{props.user_info.data.me.favoriteGenre ? (`We have quite many readings from ${props.user_info.data.me.favoriteGenre} genre`) : (`You could set your favorite genre here`)} </p>
      <button onClick={() => setgenres()}>Get recommended books from your favorite genre by clicking this</button>
  </div>
  )
}
}

export default Recommended