import React from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../reducers/anecdoteReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const filterString = event.target.value
        dispatch(filter(filterString))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter