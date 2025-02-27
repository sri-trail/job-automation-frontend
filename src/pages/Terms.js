import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Terms = () => {
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
          width: "100%",
          height: "80vh", // Allow for scrolling
          overflowY: "auto", // Make the content scrollable if it's too long
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Terms & Conditions
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          By using Job Automation, you agree to the following terms and conditions:
        </Typography>

        {/* Styled List */}
        <List sx={{ textAlign: "left", mb: 3 }}>
          <ListItem>
            <ListItemText primary="✅ All user data is encrypted and protected." />
          </ListItem>
          <ListItem>
            <ListItemText primary="✅ Job Automation is not responsible for the outcome of job applications." />
          </ListItem>
          <ListItem>
            <ListItemText primary="✅ Your resume and job applications are stored securely." />
          </ListItem>
          {/* Additional terms can be added here */}
        </List>

        <Typography variant="body1" sx={{ mt: 3 }}>
          By proceeding, you agree to these terms and conditions. If you do not agree, you may exit the application.
        </Typography>
      </Box>
    </Box>
  );
};

export default Terms;
