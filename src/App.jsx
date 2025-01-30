import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EnventPages from './pages/Envent-Pages'

function App() {
  

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/envent-page" element={<EnventPages />}/>
      </Routes>
      </Router> 
      
    </>
  )
}

export default App
