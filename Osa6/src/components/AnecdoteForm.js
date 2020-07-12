import React from 'react'
import { connect } from 'react-redux';
import { add } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newa.value
        event.target.newa.value = ""
        props.add(content)
    }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="newa" />
                    <button type="submit">create</button></div><br />
            </form>
        </div>
    )
}

const mapDispatchToProps = { add }
export default connect(null, mapDispatchToProps)(AnecdoteForm)