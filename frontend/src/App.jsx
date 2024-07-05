import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Landing from "./pages/Landing"
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Posts from './pages/Posts'
import {AppProvider} from './context/appProvider'
import Profile from "./pages/Profile"
const App = () => {
  return (
    <div>
     <AppProvider>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/*" element={<NotFound/>}/>
       
        </Routes>
        <Footer/>
      </Router>
      </AppProvider>
    </div>
  )
}

export default App