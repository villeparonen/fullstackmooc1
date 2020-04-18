import React from 'react'

const PeopleForm = ({ submitHandler, valueHandlerName, newName, valueHandlerNumber, newNumber, setNewName, typed, text }) => {
    const emptyField = (event) => {
        if (!typed) {
            setNewName('')
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <div>
                <h2>{text}</h2>
      name: <input onChange={valueHandlerName} value={newName} onClick={emptyField} />
      number: <input onChange={valueHandlerNumber} value={newNumber} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PeopleForm