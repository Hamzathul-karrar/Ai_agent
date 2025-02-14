import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search clicked with values:', input1, input2);

    setLoading(true);

    setTimeout(() => {
      setLoading(false); // ✅ Hide loading state
      navigate('/result'); // ✅ Redirect after delay
    }, 10000);
  };

  return (
    <div className="home-container">
      <h1>Search Details</h1>

      {loading ? ( // ✅ Show loader while waiting
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
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Enter location" required
              // 🔹 Added for location suggestions
          />
        </div>

        <div className="form-group">
          <label htmlFor="input2">Company Name:</label>
          <input
            type="text"
            id="input2"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Enter company" required
          />
        </div>

        <button type="submit" disabled={loading}>Search</button>
      </form>
      )}
    </div>
  );
}

export default Home;
