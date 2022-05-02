import React from 'react';
import ReactDOM from 'react-dom/client'
//import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer'

const store = configureStore({ reducer: counterReducer })

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const GiveFeedback = ({title, feedbackEvents}) => {
  return (
    <>
      {Object.keys(feedbackEvents).map(attr => <Button key={attr} text={attr} handleClick={feedbackEvents[attr]}/>)}
    </>
  )
}

// Content component
const StatisticLine = ({text, value}) => {
  return (
    <div>{`${text} ${value}`}</div>
  )
}

const Statistics = ({ feedbacks }) => {
  return (feedbacks.all === 0)
    ? <p>No feedback given</p>
    : (
      <>
        {Object.keys(feedbacks).map(attr => <StatisticLine key={attr} text={attr} value={feedbacks[attr]}/>)}
      </>
    )
}

const App = () => {
  const goodDispatch = () => {
    // The store will run its reducer function and save the new state value inside
    store.dispatch({
      type: 'GOOD'
    })
  }
  const okDispatch = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const badDispatch = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const {good, ok, bad} = store.getState()

  //const total = store.getState().good + store.getState().ok + store.getState().bad
  const total = good + ok + bad
  
  const testFractionDenominator = (numerator, denominator) => (denominator === 0) ? 0 : numerator / denominator

  const statisticsValues = {
    good,
    ok,
    bad,
    all: total,
    average: testFractionDenominator(store.getState().good - store.getState().bad, total),
    positive: testFractionDenominator(good, total)
  }

  const feedbackEvents = {
    good: goodDispatch,
    ok: okDispatch,
    bad: badDispatch,
    'reset stats': zero
  }

  return (
    <div>
      <GiveFeedback feedbackEvents={feedbackEvents}/>
      <Statistics feedbacks={statisticsValues}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  return root.render(<App />)
}

renderApp()
store.subscribe(renderApp)