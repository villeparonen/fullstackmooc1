import React from 'react'

const Filtering = ({ valueHandlerFilter, filter, text }) => (
    <form>
        <div>
            <p>{text}</p>
            <input onChange={valueHandlerFilter} value={filter} />
        </div>
    </form>
)

export default Filtering