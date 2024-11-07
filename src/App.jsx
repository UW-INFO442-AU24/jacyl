import { useState } from 'react'
import { About } from "./components/about"
// import { CardFilter } from "./components/cardfilter"
// import { Quiz } from "./components/Quiz"
import { Map } from "./components/Map"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer";
import { Home } from "./components/Home"
import { Routes, Route, Navigate } from 'react-router-dom';
import { Quiz } from './components/Quiz';
import { QuizQuestion } from './components/QuizQuestion';


function App() {

  return (
    <div>
      <Navbar />
        <Routes>
         <Route path="*" element={<Home />} />
         <Route path="about" element={<About />} />
         <Route path="map" element={<Map />} />
         <Route path="quiz" element={<Quiz />} />
         <Route path="quizquestion" element={<QuizQuestion />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
