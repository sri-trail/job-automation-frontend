import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ textAlign: "center", padding: "50px" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Job Automation
      </Typography>
      <Typography variant="h6" gutterBottom>
        Log in to explore job opportunities and more!
      </Typography>

      <Box>
        <Link to="/login">
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "10px 20px", margin: "10px" }}
            aria-label="Login"
          >
            Login
          </Button>
        </Link>

        <Link to="/signup">
          <Button
            variant="contained"
            color="success"
            sx={{ padding: "10px 20px", margin: "10px" }}
            aria-label="Sign Up"
          >
            Sign Up
          </Button>
        </Link>

        <Link to="/contact-us">
          <Button
            variant="contained"
            color="warning"
            sx={{ padding: "10px 20px", margin: "10px" }}
            aria-label="Contact Us"
          >
            Contact Us
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
