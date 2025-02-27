import React from "react";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: "url('/images/background.jpg')", // Change path if needed
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent overlay
          padding: 4,
          borderRadius: 2,
          maxWidth: "500px",
        }}
      >
        {children} {/* This will render the page content inside */}
      </Box>
    </Box>
  );
};

export default Layout;
