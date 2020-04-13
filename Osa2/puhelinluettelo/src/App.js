import React, { useState, useEffect } from 'react'
import Header from './components/header'
import Filtering from './components/filtering'
import PeopleForm from './components/peopleform'
import ShowPeople from './components/showpeople'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Rustaappa nimi...')
  const [typed, setTyped] = useState(false)
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const valueHandlerNumber = (event) => setNewNumber(event.target.value)
  const valueHandlerFilter = (event) => setFilter(event.target.value)
  const valueHandlerName = (event) => {
    setNewName(event.target.value)
    setTyped(true)
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])


  const submitHandler = (event) => {
    event.preventDefault()
    let newObject = { name: newName, number: newNumber }

    let test = persons.every(person => person.name.toLowerCase() !== newName.toLowerCase())
    if (test) {
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
      personsService.create(newObject).then(personsService
        .getAll()
        .then(allPersons => setPersons(allPersons))
      )

    } else {

      let existingNumber = persons.find(p => p.number === newNumber)
      if (existingNumber) {
        alert(`${newName} with this same phonenumber is already added to phonebook`)
      } else {
        const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if (confirmation) {
          // Fetch requested person's ID. Then update with ID info and later again fetch all updated persons to show
          personsService.getAll().then(response => {
            const id = response.filter(p => p.name === newName)[0].id
            personsService.update(id, newObject).then(
              personsService.getAll()
                .then(ap => setPersons(ap))
            )
          })
        }
      }
    }
  }


  return (
    <div>
      <Header text="Väen puhelinnumerot" />
      <Filtering valueHandlerFilter={valueHandlerFilter} filter={filter} />
      <PeopleForm submitHandler={submitHandler} valueHandlerName={valueHandlerName} newName={newName} valueHandlerNumber={valueHandlerNumber} newNumber={newNumber} setNewName={setNewName} typed={typed} />
      <ShowPeople persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  )

}

export default App