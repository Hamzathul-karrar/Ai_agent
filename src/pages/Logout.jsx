import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Logout( onLogout) {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    // localStorage.removeItem("isAuthenticated"); // ✅ Ensure authentication status is cleared
    // sessionStorage.clear();

    onLogout();
    // Redirect to login page
    navigate("/login");
  }, [navigate, onLogout]);

  return <h1>Logging out...</h1>;
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired, // 🔹 onLogout should be a function and required
};

export default Logout;
