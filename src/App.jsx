import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import PropTypes from "prop-types"; 
import Home from "./pages/Home";
import Result from "./pages/Result";
import Logout from "./pages/Logout";
import Login from "./pages/Login"; 
import SignUp from "./pages/SignUp"; 
import "./pages/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <Route
            path="/*"
            element={
              <div className="dashboard-container">
                <Sidebar handleLogout={handleLogout} />
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

function Sidebar({ handleLogout }) {
  const navigate = useNavigate(); 

  const handleLogoutClick = () => {
    handleLogout(); 
    navigate("/"); 
  };

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
          <Link onClick={handleLogoutClick} className="sidebar-item">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default App;
