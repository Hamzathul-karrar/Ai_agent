import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Import Axios
import './Home.css';

function Home() {
  const [location, setLocation] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Search clicked with values:', location, businessType);
    setLoading(true);

    try {
      // ✅ Use axios.post to send the search data
      const response = await axios.post(
        "http://localhost:8080/api/scrape",
        { businessType, location },
        {
          headers: { "Content-Type": "application/json" },
          responseType: 'text', // Use this if your response is plain text
        }
      );
      setLoading(false);
      setMessage(response.data); // ✅ Set the response message
      
      navigate('/result');
    } catch (error) {
      console.error("Error sending request:", error);
      setMessage("Error while scraping.");
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Search Details</h1>

      {loading ? (
        <div className="loader-container">
          <l-trio size="40" speed="1.3" color="black"></l-trio>
          <p>Loading... Please wait</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="input1">Location Name:</label>
            <input
              type="text"
              id="input1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="input2">Company Name:</label>
            <input
              type="text"
              id="input2"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="Enter company"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            Search
          </button>
        </form>
      )}
      {message && <p className="response-message">{message}</p>}
    </div>
  );
}

export default Home;
