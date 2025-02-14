import  { useState } from 'react';
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
    <div className="container">
      <div className="heading">Sign In</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          className="input"
          type="username"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input className="login-button" type="submit" value="Sign In" />
        <div className="signup-link">
          New user? <Link to="/signup" style={{ cursor: 'pointer' }}>Sign up</Link>
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
