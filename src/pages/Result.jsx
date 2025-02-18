import { useEffect, useState } from "react";
import axios from "axios";
import "./Result.css";

function Result() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);  // Manage loading state per email action
  const [buttonState, setButtonState] = useState({}); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/businesses")
      .then((response) => {
        const resData = response.data;
        const formattedData = Array.isArray(resData) ? resData : [];
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  async function sendDataToBackend(endpoint, payload, id) {
    try {
      setLoading(true); // Start loading when sending email
      const response = await axios.post(
        `http://localhost:8080/api/${endpoint}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(`${endpoint} successful:`, response.data);

      // After the email is sent, update the button state and stop loading
      setButtonState((prevState) => ({
        ...prevState,
        [id]: { sent: true }, 
      }));
      setLoading(false); // Stop loading once email is sent
    } catch (error) {
      console.error(`Error sending ${endpoint}:`, error);
      setLoading(false); // Stop loading in case of error
    }
  }

  function handleEmailButtonClick(email, name, id) {
    if (email && email !== "N/A") {
      console.log(`Sending email to: ${email}`);

      // Get job type from local storage
      const jobType = localStorage.getItem("businessType");

      // Get user details from local storage (username, password)
      const storedUsername = sessionStorage.getItem("username");
      const storedPassword = sessionStorage.getItem("password");

      if (!storedUsername || !storedPassword) {
        console.error("User not logged in.");
        return;
      }

      // Fetch user details from the Signup table
      axios
        .get(`http://localhost:8080/api/getUser?username=${storedUsername}&password=${storedPassword}`)
        .then((response) => {
          if (response.data) {
            const { name: senderName, companyName, companyDescription, contactInfo } = response.data;
  
            // Construct email payload
            const payload = {
              recipientEmail: email,
              recipientName: name,
              subject: "Business Email",
              jobType: jobType,
              senderName: senderName,
              companyName: companyName,
              serviceDetails: companyDescription,
              contact: contactInfo,
            };

            // Call the function to send data to the backend
            sendDataToBackend("send", payload, id);
          } else {
            console.error("User details not found in the database.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
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
      {data.length === 0 ? (
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
                      <a
                        href={`tel:${item.phone}`}
                        className="action-button"
                      >
                        Call
                      </a>
                      <button
                        className={`action-button ${
                          buttonState[item.id]?.sent ? "sent" : ""
                        }`}
                        onClick={() => handleEmailButtonClick(item.email, item.name, item.id)}
                        disabled={loading || buttonState[item.id]?.sent}
                      >
                        {loading ? (
                          <l-tail-chase size="40" speed="1.75" color="black" />
                        ) : buttonState[item.id]?.sent ? (
                          "Sent"
                        ) : (
                          "Send Mail"
                        )}
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
