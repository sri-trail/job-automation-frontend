import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Box, Alert } from "@mui/material";
import axios from "axios";

const LinkedInOAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(null);

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

  useEffect(() => {
    if (!config) return;

    const handleLinkedInResponse = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        setError("Authorization code not found.");
        console.error("Authorization code not found in URL.");
        setLoading(false);
        return;
      }

      console.log("Received LinkedIn authorization code:", code);

      try {
        // Step 1: Send the code to the backend for token exchange
        const response = await axios.post("http://localhost:3001/auth/linkedin", {
          code: code,
        });

        // Step 2: Handle backend response
        console.log("Backend Response:", response.data);

        if (response.status !== 200) {
          throw new Error(response.data.message || "Failed to authenticate with LinkedIn");
        }

        // Redirect user after successful authentication
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } catch (err) {
        setError("Authentication failed. Please try again.");
        console.error("Error during LinkedIn authentication:", err);
      } finally {
        setLoading(false);
      }
    };

    handleLinkedInResponse();
  }, [config, navigate]);

  return (
    <Box sx={{ textAlign: "center", padding: "50px" }}>
      {loading && <CircularProgress color="primary" />}
      {!loading && !error && <Typography variant="h5">Successfully authenticated with LinkedIn!</Typography>}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && <Typography variant="h6">Redirecting to your dashboard...</Typography>}
    </Box>
  );
};

export default LinkedInOAuth;
