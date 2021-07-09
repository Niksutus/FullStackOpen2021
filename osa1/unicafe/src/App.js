import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodVote = () => setGood(good + 1)
  const addNeutralVote = () => setNeutral(neutral +1)
  const addBadVote = () => setBad(bad +1)

  return (
    <div>

      <section>
        <h1>give feedback</h1>
        <button onClick={addGoodVote}>good</button>
        <button onClick={addNeutralVote}>neutral</button>
        <button onClick={addBadVote}>bad</button>
      </section>

      <section>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </section>

    </div>
  )
}

export default App
