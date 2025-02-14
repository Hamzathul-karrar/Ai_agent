import { useEffect, useState } from "react";
import "./Result.css";

function Result() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/businesses")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = Array.isArray(data) ? data : data.businesses || [];
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  function handleCallButtonClick(phone) {
    console.log(`Call button clicked: ${phone}`);
  }

  function handleEmailButtonClick(email) {
    console.log(`Email button clicked: ${email}`);
  }

  function handleAllMails(data) {
    data.forEach((item) => {
      if (item.email !== "Not Available") {
        console.log(item.email);
      }
    });
  }

  return (
    <div className="result-container">
      <h1>Result</h1>
      {loading ? (
        <p>Loading Data...</p>
      ) : data.length === 0 ? (
        <p>No Data Found.</p>
      ) : (
        <div>
          <div className="btn-all-container">
            <button className="mail-all-btn" onClick={() => handleAllMails(data)}>
              Mail To All
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Number</th>
                <th>Website</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone || "N/A"}</td>
                  <td>
                    {item.website ? (
                      <a href={item.website} target="_blank" rel="noopener noreferrer">
                        {item.website}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{item.email}</td>
                  <td>
                    <div className="button-container">
                      <button className="action-button" onClick={() => handleCallButtonClick(item.phone)}>
                        Call
                      </button>
                      <button className="action-button" onClick={() => handleEmailButtonClick(item.email)}>
                        Send Mail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Result;
