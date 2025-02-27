import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true" || false; // Default to false if not found

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/signin"); // Redirect to Sign In page
  };

  return (
    <nav style={styles.navbar}>
      <h2>Job Automation</h2>
      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/jobs" style={styles.link}>Jobs</Link>

        {isAuthenticated ? (
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        ) : (
          <>
            <Link to="/signin" style={styles.link}>Sign In</Link>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: { 
    display: "flex", 
    justifyContent: "space-between", 
    padding: "10px", 
    background: "#007bff", 
    color: "white" 
  },
  link: { 
    margin: "0 10px", 
    textDecoration: "none", 
    color: "white", 
    transition: "color 0.3s", 
  },
  linksContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoutButton: { 
    marginLeft: "10px", 
    padding: "8px", 
    background: "red", 
    color: "white", 
    border: "none", 
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

// Adding hover effect for links
styles.link = {
  ...styles.link,
  ':hover': {
    color: '#ffcc00',
  },
};

styles.logoutButton = {
  ...styles.logoutButton,
  ':hover': {
    backgroundColor: '#e60000',
  },
};

export default Navbar;
