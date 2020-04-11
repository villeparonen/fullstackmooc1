import React from 'react'

const PeopleForm = ({ submitHandler, newMessage, valueHandlerName, newName, valueHandlerNumber, newNumber, setNewName, typed }) => {
    const emptyField = (event) => {
        if (!typed) {
            setNewName('')
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <div>
                <h2>Lissääppä uus immeinen</h2>
                <h3><u>{newMessage}</u></h3>
      nimi: <input onChange={valueHandlerName} value={newName} onClick={emptyField} />
      numero: <input onChange={valueHandlerNumber} value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PeopleForm