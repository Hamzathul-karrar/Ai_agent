import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // ✅ Import PropTypes
import Home from './pages/Home';
import Result from './pages/Result';
import Logout from './pages/Logout';
import AuthenticationTitle from './pages/Login';
import './pages/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true); 
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      {isAuthenticated ? (
        <div className="dashboard-container">
          <Sidebar handleLogout={handleLogout} /> {/* ✅ Pass handleLogout */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/result" element={<Result />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      ) : (
        <AuthenticationTitle onLogin={handleLogin} /> // ✅ Pass login function
      )}
    </Router>
  );
}

function Sidebar({ handleLogout }) {
  return (
    <div className="sidebar">
      <h2 className="dashboard-title">Dashboard</h2>
      <ul>
        <li className="sidebar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/result">Result</Link>
        </li>
        <li className="sidebar-item">
          <Link onClick={handleLogout} className="sidebar-item">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

// ✅ Define PropTypes for Sidebar
Sidebar.propTypes = {
  handleLogout: PropTypes.func.isRequired, // 🔹 handleLogout should be a function and required
};

export default App;
