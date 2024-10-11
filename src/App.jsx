import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>JACYL Group :D</h1>
      <p>The current count is {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Click me</button>
    </>
  )
}

export default App
