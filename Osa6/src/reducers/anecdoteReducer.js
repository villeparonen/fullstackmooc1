
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANC':
      return [...state, action.data]
    case 'INIT_ANECS':
      return action.data.sort((a, b) => a.votes > b.votes ? -1 : 1)
    case 'VOTE':
      let noteToChange = state.find(i => {
        return i.id === action.data
      })
      const changedNote = {
        ...noteToChange,
        votes: noteToChange.votes + 1
      }
      return state.map(note =>
        note.id === action.data ? changedNote : note
      ).sort((a, b) => a.votes > b.votes ? -1 : 1)
    case 'ADD':
      let newState = state.concat(action.data)
      return newState
    case 'FILTER':
      const filterword = action.data
      const staff = state.filter(anecdot => anecdot.content.includes(filterword) === true)
      return staff
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecs,
    })
  }
}


export const add = (content) => {
    let newObj = asObject(content)
    anecdotesService.createNew(newObj)
    return {
      type: 'ADD',
      data: newObj
    }
}


export const vote = (id) => {
  return async dispatch => {
    const d = await anecdotesService.voteAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: id
    })
  }
}

export const filter = (filterWord) => {
  return {
    type: "FILTER",
    data: filterWord
  }
}



export default anecdoteReducer