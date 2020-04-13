import React from 'react'
import personsService from '../services/persons'

const ShowPeople = ({ persons, filter, setPersons, render }) => {
    const filteredList = persons.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))

    const deletePerson = (person) => {
        const confirmation = window.confirm(`Haluakko nää ihan oikeasti poistaa tän immeisen ${person.name}?`);
        if (confirmation) {
            personsService.remove(person.id).then(response => {
                personsService
                    .getAll()
                    .then(allPersons => {
                        setPersons(allPersons)
                    })
                    .then(when => console.log("Fetch all persons after removing one from DB", persons))
            })
        }
    }
    return (
        <div>
            {
                persons.length > 0 ? (
                    <h2>Väki ja niiden numerot</h2>
                ) : (<h5>Tähän pittäis ilmestyä immeisiä kuha vaa niitä ny rustailet enstiksi...</h5>)
            }
            {
                filteredList.map((person, i) => {
                    return <h3 key={i}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>Poistappa tää</button></h3>
                })
            }
            {render}
        </div>
    )
}

export default ShowPeople