import React, { useState, useEffect } from 'react'
import Header from './components/header'
import Filtering from './components/filtering'
import PeopleForm from './components/peopleform'
import ShowPeople from './components/showpeople'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Rustaappa nimi...')
  const [typed, setTyped] = useState(false)
  const [newNumber, setNewNumber] = useState('')
  const [newMessage, setMessage] = useState('')
  const [filter, setFilter] = useState('')

  const valueHandlerNumber = (event) => setNewNumber(event.target.value)
  const valueHandlerFilter = (event) => setFilter(event.target.value)
  const valueHandlerName = (event) => {
    setNewName(event.target.value)
    setTyped(true)
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const submitHandler = (event) => {
    event.preventDefault()
    let newObject = { name: newName, number: newNumber }
    let test = persons.every(person => person.name.toLowerCase() !== newName.toLowerCase())
    if (test) {
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
      setMessage('')
    } else {
      alert(`${newName} is already added to phonebook`)
      setMessage(`${newName} exists already!`)
    }
  }


  return (
    <div>
      <Header text="Väen puhelinnumerot" />
      <Filtering valueHandlerFilter={valueHandlerFilter} filter={filter} />
      <PeopleForm submitHandler={submitHandler} newMessage={newMessage} valueHandlerName={valueHandlerName} newName={newName} valueHandlerNumber={valueHandlerNumber} newNumber={newNumber} setNewName={setNewName} typed={typed} />
      <ShowPeople persons={persons} filter={filter} />
    </div>
  )

}

export default App