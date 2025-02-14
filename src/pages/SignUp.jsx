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

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log("Response Status:", response.status);

      // ✅ Allow both 200 OK and 201 Created as successful responses
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Signup failed. Status: ${response.status}`);
      }

      const responseBody = await response.text(); // Get raw response body
      console.log("Raw Response Body:", responseBody);

      let data;
      try {
        data = JSON.parse(responseBody); // Try to parse JSON
      } catch (err) {
        console.warn("Response is not JSON, but signup likely succeeded.");
        data = { message: responseBody }; // Use text response if not JSON
      }

      console.log('Signup successful:', data);
      navigate('/login'); // Redirect to login page after success

    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-heading">Sign Up</div>

        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <input required className="signup-input" type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input required className="signup-input" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input required className="signup-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input required className="signup-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input required className="signup-input" type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
        <textarea className="signup-input signup-textarea" name="companyDescription" placeholder="Company Description" value={formData.companyDescription} onChange={handleChange} />
        <input required className="signup-input" type="text" name="contactInfo" placeholder="Phone Number" value={formData.contactInfo} onChange={handleChange} />
        <input className="signup-button" type="submit" value="Sign Up" />
        
        <div className="signup-login-link">
          Already have an account? <Link to="/login" className="signup-login-link-text">Sign in</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
