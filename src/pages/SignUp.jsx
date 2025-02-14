import  { useState } from 'react';
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
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Redirect to login page after successful signup
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="heading">Sign Up</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          className="input"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />
        <textarea
          className="input textarea"
          name="companyDescription"
          placeholder="Company Description"
          value={formData.companyDescription}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="text"
          name="contactInfo"
          placeholder="Website or Phone Number"
          value={formData.contactInfo}
          onChange={handleChange}
        />
        <input className="login-button" type="submit" value="Sign Up" />
        <div className="signup-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp; 