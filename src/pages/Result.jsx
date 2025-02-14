import { useEffect, useState } from "react";
import './Result.css';

function Result() {
  const staticData = [
    { id: 1, companyName: "Tech Solutions", number: "123-456-7890", website: "https://techsolutions.com", email: "info@techsolutions.com" },
    { id: 2, companyName: "Web Innovators", number: "987-654-3210", website: "https://webinnovators.com", email: "contact@webinnovators.com" },
    { id: 3, companyName: "Data Corp", number: "555-123-4567", website: "https://datacorp.com", email: "support@datacorp.com" },
    { id: 4, companyName: "AI Revolution", number: "321-654-9870", website: "https://airevolution.com", email: "hello@airevolution.com" },
    { id: 5, companyName: "Cloud Nine", number: "741-852-9630", website: "https://cloudnine.com", email: "contact@cloudnine.com" },
    { id: 6, companyName: "Cybernetics Ltd", number: "852-369-7410", website: "https://cybernetics.com", email: "support@cybernetics.com" },
    { id: 7, companyName: "Quantum Soft", number: "963-258-1470", website: "https://quantumsoft.com", email: "info@quantumsoft.com" },
    { id: 8, companyName: "Neural Systems", number: "159-357-4860", website: "https://neuralsystems.com", email: "team@neuralsystems.com" },
    { id: 9, companyName: "Code Wizards", number: "753-951-8520", website: "https://codewizards.com", email: "admin@codewizards.com" },
    { id: 10, companyName: "Innovate Hub", number: "369-852-7410", website: "https://innovatehub.com", email: "support@innovatehub.com" },
    { id: 11, companyName: "Tech Pioneers", number: "654-321-7890", website: "https://techpioneers.com", email: "hello@techpioneers.com" },
    { id: 12, companyName: "Big Data Analytics", number: "741-963-8520", website: "https://bigdataanalytics.com", email: "info@bigdataanalytics.com" },
    { id: 13, companyName: "Future Vision", number: "951-753-3570", website: "https://futurevision.com", email: "team@futurevision.com" },
    { id: 14, companyName: "Green Energy Tech", number: "852-456-7890", website: "https://greenenergytech.com", email: "contact@greenenergytech.com" },
    { id: 15, companyName: "NextGen AI", number: "123-987-6540", website: "https://nextgenai.com", email: "hello@nextgenai.com" },
    { id: 16, companyName: "Smart Devices Inc", number: "369-159-2580", website: "https://smartdevices.com", email: "support@smartdevices.com" },
    { id: 17, companyName: "Deep Learning Labs", number: "951-753-1590", website: "https://deeplearninglabs.com", email: "info@deeplearninglabs.com" },
    { id: 18, companyName: "Secure Cyber", number: "258-147-3690", website: "https://securecyber.com", email: "admin@securecyber.com" },
    { id: 19, companyName: "Blockchain X", number: "789-321-4560", website: "https://blockchainx.com", email: "contact@blockchainx.com" },
    { id: 20, companyName: "Robotics Future", number: "654-789-1230", website: "https://roboticsfuture.com", email: "hello@roboticsfuture.com" }
];

  const [data, setData] = useState(staticData);

  useEffect(() => {
    fetch("http://localhost:8080/api/results")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="result-container">
      <h1>Result</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Number</th>
            <th>Website</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.companyName}</td>
              <td>{item.number}</td>
              <td><a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a></td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
