import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
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
          maxWidth: "700px",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          About Us
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Job Automation is an AI-powered platform that helps job seekers automate the
          application process. With features like automatic job applications and
          real-time tracking, we simplify the process and make job searching <strong>faster and easier</strong>.
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 3 }}>
          Join us in revolutionizing the way people apply for jobs with <strong>AI-driven automation</strong>!
        </Typography>

        <Button
          component={Link}
          to="/signup" // You can adjust this to any relevant page
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default About;
