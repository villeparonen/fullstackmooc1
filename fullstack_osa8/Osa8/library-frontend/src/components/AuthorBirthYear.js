import React, { useState } from 'react'


const AuthorBirthYear = (props) => {
  const [setBornTo, setYear] = useState('')
  const [name, setName] = useState('')

  const submit = async (event) => {
    event.preventDefault()

    let test = props.authors.find(author => {
      return author.name===name
    })
    if(test) {
      props.editAuthor({  variables: { name, setBornTo } })
    }

    setYear('')
    setName('')
  }

    return (
      <div>
        <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => {console.log(target) 
          setName(target.value)}}>
        <option>Select name</option>
        {props.authors.map(a =>
          <option value={a.name} key={a.id}>{a.name}</option>
        )}
        </select>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
    )
  }

export default AuthorBirthYear
