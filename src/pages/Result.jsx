import { useEffect, useState } from "react";
import axios from "axios"; // ✅ Import Axios
import "./Result.css";

function Result() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/businesses")
      .then((response) => {
        const resData = response.data;
        const formattedData = Array.isArray(resData)
          ? resData
          : resData.businesses || [];
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  async function sendDataToBackend(endpoint, payload) {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/${endpoint}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(`${endpoint} successful:`, response.data);
    } catch (error) {
      console.error(`Error sending ${endpoint}:`, error);
    }
  }

  function handleCallButtonClick(phone) {
    if (phone && phone !== "N/A") {
      console.log(`Calling: ${phone}`);
      sendDataToBackend("call", { phone });
    }
  }

  function handleEmailButtonClick(email) {
    if (email && email !== "N/A") {
      console.log(`Sending email to: ${email}`);
      sendDataToBackend("send-mail", { email });
    }
  }

  function handleAllMails() {
    const validEmails = data
      .filter((item) => item.email && item.email !== "N/A")
      .map((item) => item.email);

    if (validEmails.length > 0) {
      console.log("Sending emails to:", validEmails);
      sendDataToBackend("send-all-mails", { emails: validEmails });
    } else {
      console.log("No valid emails available.");
    }
  }

  return (
    <div className="result-container">
      <h1>Result</h1>
      {loading ? (
        <div className="loader-container">
          <l-trio size="40" speed="1.3" color="black"></l-trio>
          <p>Loading... Please wait</p>
        </div>
      ) : data.length === 0 ? (
        <p>No Data Found.</p>
      ) : (
        <div>
          <div className="btn-all-container">
            <button className="mail-all-btn" onClick={handleAllMails}>
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
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.website}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{item.email}</td>
                  <td>
                    <div className="button-container">
                      <button
                        className="action-button"
                        onClick={() => handleCallButtonClick(item.phone)}
                      >
                        Call
                      </button>
                      <button
                        className="action-button"
                        onClick={() => handleEmailButtonClick(item.email)}
                      >
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
