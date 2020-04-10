import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ text, value }) => <button onClick={value}>{text}</button>
const Votes = ({ anecsVotes, index }) => <p>Has {anecsVotes[index]} votes</p>
const Anecdote = ({ anecdotes, index }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[index]} {anecdotes[index]}</p>
  </div>
)

const MostVotes = ({ votes, anecdotes }) => {
  let mostVotes = Math.max(...votes)
  let mostVotedAnecdoteIndex = votes.indexOf(mostVotes)
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotedAnecdoteIndex]}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [anecsVotes, setVote] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))


  const random = () => {
    console.log(props.anecdotes.length)
    const randomNumber = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(randomNumber)
  }

  const voteAnecdote = () => {
    let copy = anecsVotes.slice()
    let increase = copy[selected] + 1
    copy[selected] = increase
    setVote(copy)
  }

  return (
    <div>
      <Anecdote anecdotes={props.anecdotes} index={selected} />
      <Votes anecsVotes={anecsVotes} index={selected} />
      <Button text={"Vote"} value={voteAnecdote} />
      <Button text={"Next anecdote"} value={random} />
      <MostVotes votes={anecsVotes} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)