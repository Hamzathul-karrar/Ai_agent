import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Redirect to home or login page
    navigate("/login");
  }, [navigate]);

  return <h1>Logging out...</h1>;
}

export default Logout;
