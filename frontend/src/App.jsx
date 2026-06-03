import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <header className="navbar">
        <NavLink to="/" className="nav-logo">
          🎓 Smart<span>Placement</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Home
          </NavLink>
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Login
          </NavLink>
          <NavLink 
            to="/register" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Register
          </NavLink>
        </nav>
      </header>

      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
