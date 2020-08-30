  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}



const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // Hakee kaikki resurssit palvelimelta
  // useEffect
  useEffect(() => {
    const url = baseUrl
    console.log(url)
    const fetchData = async () => {
      const result = await axios(
        url,
      );
      console.log(result.data)
      setResources(result.data)
    };
    fetchData();
  }, []);

  const create = async (resource) => {
    // Luo resurssin palvelimelle
    const randomNumber = Math.floor(Math.random() * 100000)
    if(resource.content) {
      console.log({content: resource.content, id: randomNumber})
      const newContent = {content: resource.content, id: randomNumber}
      const newResources = resources.concat(newContent)
      setResources(newResources)
    } else {
      console.log({name: resource.name, number: resource.number, id: randomNumber})
      const newContent = {name: resource.name, number: resource.number, id: randomNumber}
      const newResources = resources.concat(newContent)
      setResources(newResources)
    }

    console.log("resources in create", resource)
    const response = await axios.post(baseUrl, resource)
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}




const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  console.log("test notes", notes)
  console.log("test persons", persons)

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App