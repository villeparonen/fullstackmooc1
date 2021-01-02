import React, { useState } from 'react'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState(2000)
  const [genre, setGenre] = useState('')
  const [goal, setGoal] = useState('fun')
  const [pages, setPages] = useState(200)
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    

    props.createBook({  variables: { title, author, published, genres, pages, goal, date, notes } })

    setTitle('')
    setPublished(2000)
    setAuhtor('')
    setGenres([])
    setGenre('')
    setGoal('fun')
    setPages(200)
    setDate('')
    setNotes('')
  }


  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  const setGenreByOption = (e) => {
    setGenres(genres.concat(e.currentTarget.innerHTML.toLowerCase()))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value.toLowerCase())}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          Optional genres: <span onClick={(e) => setGenreByOption(e)}> business</span>,  
          <span onClick={(e) => setGenreByOption(e)}> tech</span>,  
          <span onClick={(e) => setGenreByOption(e)}> programming</span>, 
          <span onClick={(e) => setGenreByOption(e)}> scifi</span>,
          <span onClick={(e) => setGenreByOption(e)}> horror</span>,
          <span onClick={(e) => setGenreByOption(e)}> romance</span>
        </div>
        <div>
          Chosen genres: {genres.join(' ')}
        </div>
        <div>
          amount of pages?
          <input
            type='number'
            value={pages}
            onChange={({ target }) => setPages(parseInt(target.value))}
          />
        </div>
        <div>
          Why do you want to read this book? Goal for reading?
          <input
            value={goal}
            onChange={({ target }) => setGoal(target.value)}
          />
        </div>
        <div>
         By what date has the book been read?
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
         Notes about the book
          <input
            value={notes}
            onChange={({ target }) => setNotes(target.value)}
          />
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook