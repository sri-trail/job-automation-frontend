import React, { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress, Alert } from "@mui/material";

const JobStatus = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous error

    try {
      const response = await fetch(`http://localhost:3000/get-status?email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job status');
      }
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      setError('Error fetching job status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", textAlign: "center", padding: "20px", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>Check Job Application Status</Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Check Status'}
        </Button>
      </form>

      {error && <Alert severity="error">{error}</Alert>}

      {status && !error && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>Status</Typography>
          {status.length > 0 ? (
            status.map((app, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography><strong>Job Title:</strong> {app.jobTitle}</Typography>
                <Typography><strong>Company:</strong> {app.company}</Typography>
                <Typography><strong>Status:</strong> {app.status}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No job applications found for this email.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default JobStatus;
