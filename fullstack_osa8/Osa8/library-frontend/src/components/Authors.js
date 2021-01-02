import React, { useState } from 'react'
import AuthorBirthYear from './AuthorBirthYear'


const Authors = (props) => {
  const [selectedName, setSelectedName] = useState('')
  if (!props.show) {
    return null
  }

  const selectOne = (e) => {
    setSelectedName(e.currentTarget.innerHTML)
  }

  const random = () => {
    return Math.floor(Math.random() * (250 - 1) + 1)
  }

  if ( props.all_authors_data.loading ) {
    return <div>loading...</div>
  } 
  
  if(typeof props.all_authors_data.data.allAuthors.length != "undefined") {
    
    let authors = props.all_authors_data.data.allAuthors
    console.log(authors)

    return (
      <div style={{border: "2px solid black", padding: "1px"}}>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th>
                Name:
              </th>
              <th>
                Born:
              </th>
              <th>
                Books count:
              </th>
              <th>
                Books written:
              </th>
              <th>
                Genres:
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.id}>
                <td onClick={selectOne}>{a.name} </td>
                <td>{a.born || "-"} </td>
                <td>{a.bookCount || "-"} </td>
                <td>{a.books.map((g, u) => <span key={u} style={{color: `rgb(${random()}, ${random()}, ${random()})`}}>{g.title} </span>)}</td>
                {a.books.map((gx, ux) => {
                  return (<td key={ux}>
                  {gx.genres.map((yd, qw) => {return <span key={random()}>{yd} </span>})}
                  </td>)
                })}
                
              </tr>
            )}
          </tbody>
        </table>
      <AuthorBirthYear editAuthor={props.editAuthor} authors={authors} selectedName={selectedName} />
      </div>
    )
  }

}

export default Authors
