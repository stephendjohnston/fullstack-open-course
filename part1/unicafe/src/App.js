import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({clicks}) => {
  const total = clicks.good + clicks.neutral + clicks.bad
  const average = (clicks.good * 1 + clicks.bad * -1) / total
  const positive = clicks.good * (100/total)

  if (total === 0) {
    return (
      <div>
        <h3>No feeback given</h3>
      </div>
    )
  }
  
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={clicks.good}/>
          <StatisticLine text="neutral" value={clicks.neutral}/>
          <StatisticLine text="bad" value={clicks.bad}/>
          <StatisticLine text="all" value={total}/>
          <StatisticLine text="average" value={average.toFixed(2)}/>
          <StatisticLine text="positive" value={positive.toFixed(2)}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () =>
    setClicks({...clicks, good: clicks.good + 1})

  const handleNeutralClick = () =>
    setClicks({...clicks, neutral: clicks.neutral + 1})

  const handleBadClick = () =>
    setClicks({...clicks, bad: clicks.bad + 1})
 
  
  return (
    <div>
      <Header text="Give Feedback"/>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Header text="Statistics"/>
      <Statistics clicks={clicks}/>
    </div>
  )
}

export default App