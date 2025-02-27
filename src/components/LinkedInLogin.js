import React, { useState, useEffect } from "react";
import { LinkedIn } from "react-linkedin-login-oauth2";
import axios from "axios";

const LinkedInLogin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(null);

  // Fetch LinkedIn Client ID and Redirect URI from Backend
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/linkedin-config");
        setConfig(res.data);
      } catch (err) {
        console.error("Error fetching LinkedIn config:", err);
        setError("Failed to load LinkedIn configuration.");
      }
    };
    fetchConfig();
  }, []);

  // Success handler after LinkedIn authentication
  const handleSuccess = async (response) => {
    try {
      setLoading(true);
      console.log("Login Successful:", response);

      // Send the LinkedIn auth code to the backend for verification
      const res = await axios.post("http://localhost:3001/auth/linkedin", {
        code: response.code,
      });

      console.log("Backend Response:", res.data);
      setUser(res.data.user); // Set the user data received from backend
    } catch (err) {
      console.error("Error during backend call:", err);
      setError("An error occurred while processing the login.");
    } finally {
      setLoading(false);
    }
  };

  // Error handler for LinkedIn login
  const handleError = (error) => {
    console.error("Login Error:", error);
    setError("An error occurred during login.");
  };

  if (!config) {
    return <p>Loading configuration...</p>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <h3>Welcome, {user.localizedFirstName}!</h3>
        </div>
      ) : (
        <div>
          <LinkedIn
            clientId={config.clientId}
            redirectUri={config.redirectUri}
            onSuccess={handleSuccess}
            onError={handleError}
            scope="r_liteprofile w_member_social"
            authUrl={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=r_liteprofile w_member_social&prompt=login`}
          >
            {({ linkedInLogin }) => (
              <button onClick={linkedInLogin} style={styles.button}>
                Sign in with LinkedIn
              </button>
            )}
          </LinkedIn>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#0077b5", // LinkedIn Blue
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default LinkedInLogin;
