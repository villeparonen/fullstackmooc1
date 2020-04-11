import React from 'react'

const ShowPeople = ({ persons, filter }) => {
    let filteredList = persons.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <div>
            {
                persons.length > 0 ? (
                    <h2>Väki ja niiden numerot</h2>
                ) : (<h5>Tähän pittäis ilmestyä immeisiä kuha vaa niitä ny rustailet enstiksi...</h5>)
            }
            {
                filteredList.map((person, i) => {
                    return <h3 key={i}>{person.name} {person.number}</h3>
                })
            }
        </div>
    )
}

export default ShowPeople