import React from 'react'
import personsService from '../services/persons'

const ShowPeople = ({ persons, filter, setPersons, text, setMessage }) => {
    const filteredList = persons.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))

    const deletePerson = (person) => {
        const confirmation = window.confirm(`Do you really want to remove ${person.name} from phonebook?`);
        if (confirmation) {
            personsService.remove(person.id).then(response => {
                personsService
                    .getAll()
                    .then(allPersons => {
                        setPersons(allPersons)
                    })
                    .then(setMessage(`Removed ${person.name}'s from phonebook`),
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    )
            })
        }
    }
    return (
        <div>
            {
                persons.length > 0 ? (
                    <h2>{text}</h2>
                ) : (<h5>Here you could see list of people with their numbers.. when you first add some ones to the list!</h5>)
            }
            {
                filteredList.map((person, i) => {
                    return <h3 key={i}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>Remove</button></h3>
                })
            }
        </div>
    )
}

export default ShowPeople