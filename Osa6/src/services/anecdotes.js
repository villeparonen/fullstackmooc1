import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    // const object = { content: content.content, id: content.id, votes: 0 }
    const response = await axios.post(baseUrl, content)
    return response.data
}

const voteAnecdote = async (idd) => {
    const response = await axios.get(baseUrl)
    console.log("Response in voteAnecdote, ", response.data)
    await axios.delete(`${baseUrl}/${idd}`)
    const anecdoteWithIncreasedVote = await axios.post(baseUrl, { ...response.data.find(i => i.id === idd), votes: response.data.find(i => i.id === idd).votes + 1 })
    return anecdoteWithIncreasedVote
}




export default { getAll, createNew, voteAnecdote }