import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear error when typing
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.message || formData.message.length < 10) {
      setError("Message must be at least 10 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(""); // Clear any previous errors

    // Simulate a network request to send the data
    try {
      // Replace the following with your actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      setSuccess(true); // Show success message
      setFormData({ name: "", email: "", message: "" }); // Reset form fields
    } catch (error) {
      setError("There was an issue submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent overlay
          color: "white",
          padding: 4,
          borderRadius: 2,
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Have a question? Get in touch!
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Your message has been sent successfully!</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2, backgroundColor: "white", borderRadius: "5px" }}
          />
          <TextField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2, backgroundColor: "white", borderRadius: "5px" }}
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            sx={{ mb: 3, backgroundColor: "white", borderRadius: "5px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Contact;
