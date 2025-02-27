import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";

const LogIn = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginIn = () => {
    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true); // Start loading

    // Simulating a check for credentials (you can replace this with your actual logic)
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem(email));
      if (storedUser && storedUser.password === password) {
        // Set login status in localStorage
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true); // Update the login status
        navigate("/dashboard"); // Redirect to dashboard after login
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false); // Stop loading after the process
    }, 1000); // Simulating a delay for the login process
  };

  return (
    <Box sx={{ textAlign: "center", maxWidth: 400, margin: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Log In
      </Typography>
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && <Typography sx={{ color: "red", mb: 2 }}>{error}</Typography>}
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Button variant="contained" onClick={handleLoginIn}>
          Log In
        </Button>
      )}
    </Box>
  );
};

export default LogIn;
