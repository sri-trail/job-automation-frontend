import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert, Checkbox, FormControlLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout"; // Background wrapper

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    otp: "",
    resume: null,
    coverLetter: null,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.trim(),
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
      general: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required.";
      valid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    if (!formData.resume) {
      newErrors.resume = "Resume is required.";
      valid = false;
    }

    if (!formData.coverLetter) {
      newErrors.coverLetter = "Cover letter is required.";
      valid = false;
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions.";
      valid = false;
    }

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
      valid = false;
    }

    if (otpSent && !formData.otp) {
      newErrors.otp = "OTP is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      // Simulate an API call for user registration
      setTimeout(() => {
        if (localStorage.getItem(formData.email)) {
          setErrors({ general: "User already exists. Please Sign In." });
          setLoading(false);
          return;
        }

        // Save user data in localStorage (for demo purposes)
        localStorage.setItem(formData.email, JSON.stringify(formData));

        alert("Sign up successful! Please sign in.");
        navigate("/signin"); // Redirect to sign-in page
        setLoading(false);
      }, 1000);
    }
  };

  const sendOtp = () => {
    // In a real scenario, use an API to send OTP
    console.log("Sending OTP to:", formData.mobileNumber);
    setOtpSent(true); // Show OTP input after sending OTP
  };

  return (
    <Layout>
      <Box sx={{ textAlign: "center", maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
          />

          <TextField
            fullWidth
            label="Mobile Number"
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            error={Boolean(errors.mobileNumber)}
            helperText={errors.mobileNumber}
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
          />

          {otpSent && (
            <TextField
              fullWidth
              label="Enter OTP"
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              error={Boolean(errors.otp)}
              helperText={errors.otp}
              sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
            />
          )}

          <div>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf, .doc, .docx"
              style={{ marginBottom: "10px" }}
            />
            {formData.resume && <Typography variant="body2" sx={{ color: "white" }}>Resume: {formData.resume.name}</Typography>}
            {errors.resume && <Alert severity="error">{errors.resume}</Alert>}
          </div>

          <div>
            <input
              type="file"
              name="coverLetter"
              onChange={handleChange}
              accept=".pdf, .doc, .docx"
              style={{ marginBottom: "10px" }}
            />
            {formData.coverLetter && <Typography variant="body2" sx={{ color: "white" }}>Cover Letter: {formData.coverLetter.name}</Typography>}
            {errors.coverLetter && <Alert severity="error">{errors.coverLetter}</Alert>}
          </div>

          <FormControlLabel
            control={
              <Checkbox
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
            }
            label="I accept the Terms and Conditions"
          />
          {errors.termsAccepted && <Alert severity="error">{errors.termsAccepted}</Alert>}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          {!otpSent && (
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={sendOtp}
            >
              Send OTP
            </Button>
          )}

          <Typography variant="body2" sx={{ color: "white", mt: 2 }}>
            Already have an account? <Link to="/signin" style={{ color: "#ffcc00" }}>Sign In</Link>
          </Typography>
        </form>

        {errors.general && <Alert severity="error" sx={{ mt: 2 }}>{errors.general}</Alert>}
      </Box>
    </Layout>
  );
};

export default SignUp;
