import { useState } from 'react';
import PropTypes from 'prop-types'; // ✅ Import PropTypes
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) { // ✅ Accept onLogin as a prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validUser = {
    username: 'a',
    password: 'a',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === validUser.username && password === validUser.password) {
      setError('');
      onLogin(); // ✅ Call the login function from App.jsx
      navigate('/'); // ✅ Redirect to Home
    } else {
      setError('Invalid username or password!');
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
