import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

function Navigation() {
  const { user, logout } = useAuth();

  return (
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
        {user ? (
          <>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/quiz" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Practice Quiz
            </NavLink>
            <button 
              onClick={logout}
              className="btn btn-secondary logout-btn"
              style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </header>
  );
}

function AppContent() {
  return (
    <Router>
      <Navigation />
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
