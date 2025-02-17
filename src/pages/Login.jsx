import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // ✅ Import Axios
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // ✅ Use axios.post to send credentials to the backend
      const { data } = await axios.post('http://localhost:8080/api/login', { username, password });
      console.log('Login successful:', data);

      // ✅ Call login function from App.jsx and redirect to Home
      onLogin();
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      // ✅ Extract error message from axios response, if available
      const errorMessage = error.response?.data?.error || error.message || 'Invalid username or password!';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
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
        <div className="login-signup-link">
          New user? <Link to="/signup" className="login-signup-link-text">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
