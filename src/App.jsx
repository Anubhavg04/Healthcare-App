import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DoctorList from './pages/DoctorList'

function App(){
  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<div className="mt-8">Welcome to Healthcare App</div>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/doctors" element={<DoctorList/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
