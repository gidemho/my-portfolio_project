import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Landing from "./pages/Landing"
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'

const App = () => {
  return (
    <div>
     
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/*" element={<NotFound/>}/>
       
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App