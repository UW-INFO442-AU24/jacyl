import { useState } from 'react'
import { About } from "./components/about"
import {ResourceList} from "./components/ResourceList"
// import { CardFilter } from "./components/cardfilter"
// import { Quiz } from "./components/quiz"
// import { Map } from "./components/map"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer";
import { Home } from "./components/home"
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <h1>JACYL Group :D</h1>
      <p>The current count is {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Click me</button>
      <p>Test that this builds correctly again</p> */}
      <Navbar />
        <Routes>
         <Route path="*" element={<Home />} />
         <Route path="about" element={<About />} />
         <Route path="resources" element={<ResourceList />} />

        </Routes>
      <Footer />
    </div>
  )
}

export default App
