import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    companyName: '',
    companyDescription: '',
    contactInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/login'); // Redirect to login after signup
  };

  return (
    <div className="signup-container">
      
      <form onSubmit={handleSubmit} className="signup-form">
      <div className="signup-heading">Sign Up</div>
        <input
          required
          className="signup-input"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          required
          className="signup-input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          required
          className="signup-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          required
          className="signup-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          required
          className="signup-input"
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />
        <textarea
          className="signup-input signup-textarea"
          name="companyDescription"
          placeholder="Company Description"
          value={formData.companyDescription}
          onChange={handleChange}
        />
        <input
          required
          className="signup-input"
          type="text"
          name="contactInfo"
          placeholder="Website or Phone Number"
          value={formData.contactInfo}
          onChange={handleChange}
        />
        <input className="signup-button" type="submit" value="Sign Up" />
        <div className="signup-login-link">
          Already have an account? <Link to="/login" className="signup-login-link-text">Sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
