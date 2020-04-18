import React, { useState, useEffect } from 'react'
import Header from './components/header'
import Filtering from './components/filtering'
import PeopleForm from './components/peopleform'
import ShowPeople from './components/showpeople'
import Notification from './components/notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Write name...')
  const [typed, setTyped] = useState(false)
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
        .then(
          setMessage(`Added ${newName}, ${newNumber}`),
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        )
      ).catch(error => {
        setErrorMessage(
          `Error happened when tried to add new person and number!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    } else {

      let existingNumber = persons.find(p => p.number === newNumber)
      if (existingNumber) {
        alert(`${newName} with this same phonenumber is already added to phonebook`)
      } else {
        const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if (confirmation) {
          // Fetch requested person's ID. Then update server with ID info and update front end view
          personsService.getAll().then(response => {
            const id = response.filter(p => p.name === newName)[0].id
            personsService.update(id, newObject).then(updatedObject => {
              let updatedPersons = persons.filter(p => p.name !== newName).concat(updatedObject)
              setPersons(updatedPersons)
            }
            ).then(setMessage(`Changed ${newName}'s phonenumber to ${newNumber}`),
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            )
          }).catch(error => {
            setErrorMessage(
              `Error happened when tried to change phonenumber of existing person!`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        }
      }
    }
  }


  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={message} errorMessage={errorMessage} />
      <Filtering valueHandlerFilter={valueHandlerFilter} filter={filter} text={"Filter shown with"} />
      <PeopleForm submitHandler={submitHandler} valueHandlerName={valueHandlerName} newName={newName} valueHandlerNumber={valueHandlerNumber} newNumber={newNumber} setNewName={setNewName} typed={typed} text={"Add a new"} />
      <ShowPeople persons={persons} setPersons={setPersons} filter={filter} text={"People and their numbers"} setMessage={setMessage} />
    </div>
  )

}

export default App