import React from 'react'

const Filtering = ({ valueHandlerFilter, filter }) => (
    <form>
        <div>
            <h2>Filtteröinti</h2>
            <input onChange={valueHandlerFilter} value={filter} />
        </div>
    </form>
)

export default Filtering