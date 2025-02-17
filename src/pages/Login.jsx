import { useState } from 'react';
import PropTypes from 'prop-types'; // ✅ Import PropTypes
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) { // ✅ Accept onLogin as a prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
        const response = await fetch('http://localhost:8080/api/login', { // 🔹 Update with your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) // ✅ Send username & password to backend
        });

        const data = await response.json(); // ✅ Read response JSON

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        console.log('Login successful:', data); // ✅ Debugging log
        
        alert("Login successful! Redirecting to home."); // ✅ User feedback
        onLogin(); // ✅ Call login function from App.jsx
        navigate('/'); // ✅ Redirect to Home

    } catch (error) {
        console.error('Login error:', error);
        setError(error.message || 'Invalid username or password!', error);
    }
};


  return (
    <div className="login-container"> {/* ✅ Added specific class for Login */}
      
      <form onSubmit={handleSubmit} className="login-form"> {/* ✅ Updated class names */}
      <div className="login-heading">Sign In</div>
        <input
          required
          className="login-input"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          className="login-input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input className="login-button" type="submit" value="Sign In" />
        <div className="login-signup-link"> {/* ✅ Updated class name */}
          New user? <Link to="/signup" className="login-signup-link-text">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

// ✅ Add PropTypes validation
Login.propTypes = {
  onLogin: PropTypes.func.isRequired, // 🔹 onLogin should be a function and required
};

export default Login;
