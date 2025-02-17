import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Logout( onLogout) {
  const navigate = useNavigate();

  useEffect(() => {
    

    onLogout();
    navigate("/login");
  }, [navigate, onLogout]);

  return <h1>Logging out...</h1>;
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired, 
};

export default Logout;
