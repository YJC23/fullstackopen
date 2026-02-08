import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral
  const sum = good + neutral + bad

  if (sum == 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <h1> Statistics </h1>
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="All" value={sum} />
      <StatisticsLine text="Average" value={(good-bad)/sum} />
      <StatisticsLine text="Positive" value={good/sum * 100} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const isGood = () => {
    setGood(good + 1)
  }
  const isNeutral = () => {
    setNeutral(neutral + 1)
  }
  const isBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> Give Feedback </h1>
      <Button onClick={isGood} text="good" />
      <Button onClick={isNeutral} text="neutral" />
      <Button onClick={isBad} text="bad" />
      
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App