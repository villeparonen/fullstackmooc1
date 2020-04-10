import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Button = ({ text, value }) => <button onClick={value}>{text}</button>

const Buttons = ({ RateGood, RateNeutral, RateBad }) => {
  return (
    <div>
      <Button text={"good"} value={RateGood} />
      <Button text={"neutral"} value={RateNeutral} />
      <Button text={"bad"} value={RateBad} />
    </div>
  )
}

const StaticsLine = ({ text, value }) => {
  let symbol = (text === "positive") ? ("%") : ("");
  return (
    <tr><td>{text} {value} {symbol}</td></tr>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (all > 0) ? (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StaticsLine text={"good"} value={good} />
          <StaticsLine text={"neutral"} value={neutral} />
          <StaticsLine text={"bad"} value={bad} />
          <StaticsLine text={"all"} value={all} />
          <StaticsLine text={"average"} value={average} />
          <StaticsLine text={"positive"} value={100 * positive} />
        </tbody>
      </table>
    </div>
  ) : (
      <div>
        <h1>Statistics</h1>
        <h3>No feedback given</h3>
      </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const RateGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(((good + 1) + (bad * -1)) / (all + 1))
    setPositive((good + 1) / (all + 1))
  }

  const RateNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good + (bad * -1)) / (all + 1))
    setPositive(good / (all + 1))
  }

  const RateBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good + ((bad + 1) * -1)) / (all + 1))
    setPositive(good / (all + 1))
  }


  return (
    <div>
      <Header />
      <Buttons RateGood={RateGood} RateNeutral={RateNeutral} RateBad={RateBad} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)