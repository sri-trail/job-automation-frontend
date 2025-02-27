import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Snackbar, Alert, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPreferencesSet, setIsPreferencesSet] = useState(true);
  const [jobStatus, setJobStatus] = useState(null);
  const [documents, setDocuments] = useState({ cv: null, coverLetter: null, certificates: null });
  const [isDocumentsUploaded, setIsDocumentsUploaded] = useState(false);
  const [linkedInToken, setLinkedInToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.jobPreferences || user.jobPreferences.length === 0) {
      setIsPreferencesSet(false);
    } else {
      setIsPreferencesSet(true);
    }

    if (user) {
      fetchJobStatus();
      fetchLinkedInToken();
    }
  }, [user]);

  const fetchJobStatus = async () => {
    try {
      if (user) {
        const response = await fetch(`http://localhost:3001/api/job-status/${user.id}`);
        const data = await response.json();
        if (response.ok) {
          setJobStatus(data);
        } else {
          setErrorMessage(data.message || "Error fetching job status");
        }
      }
    } catch (error) {
      setErrorMessage("Error fetching job status");
    }
  };

  const fetchLinkedInToken = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/linkedin-token/${user.id}`);
      const data = await response.json();

      console.log("🔍 LinkedIn Token Response:", data);

      if (response.ok && data.token) {
        setLinkedInToken(data.token);
      } else {
        setErrorMessage(data.error || "Failed to retrieve LinkedIn authentication token.");
      }
    } catch (error) {
      setErrorMessage("Error fetching LinkedIn token.");
    }
  };

  const handleDocumentUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments((prevDocs) => {
        const newDocuments = { ...prevDocs, [docType]: { file, name: file.name } };
        // Enable the "Start Auto-Apply" button if all documents are uploaded
        setIsDocumentsUploaded(
          newDocuments.cv && newDocuments.coverLetter && newDocuments.certificates
        );
        return newDocuments;
      });
    }
  };

  const handleFileUpload = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Check if all required documents are uploaded
    if (!documents.cv?.file || !documents.coverLetter?.file || !documents.certificates?.file) {
      setErrorMessage("Please upload all required documents before proceeding.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("cv", documents.cv.file);
      formData.append("coverLetter", documents.coverLetter.file);
      formData.append("certificates", documents.certificates.file);

      const response = await fetch("http://localhost:3001/api/upload-documents", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      console.log("📂 Upload Response:", result);

      if (response.ok) {
        setSuccessMessage("Documents uploaded successfully! Start auto-apply by logging in to LinkedIn.");
        setIsDocumentsUploaded(true);
        // Fetch LinkedIn token again after uploading documents
        fetchLinkedInToken();
      } else {
        setErrorMessage(result.message || "Error uploading documents.");
      }
    } catch (error) {
      console.error("❌ Upload Error:", error);
      setErrorMessage("Error uploading documents.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoApply = async () => {
    if (!isDocumentsUploaded) {
      setErrorMessage("Please upload all documents before starting auto-apply.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/linkedin-config");
      const config = await res.json();

      console.log("🔍 LinkedIn Config:", config);

      if (!config.clientId || !config.redirectUri) {
        throw new Error("LinkedIn Client ID or Redirect URI is missing from server.");
      }

      window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=w_member_social&prompt=login`;
    } catch (error) {
      console.error("Error fetching LinkedIn credentials:", error);
      setErrorMessage("Failed to initiate LinkedIn authentication.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Dashboard</Typography>
      <Button variant="contained" color="secondary" onClick={onLogout} sx={{ mt: 2 }}>
        Logout
      </Button>

      <Box mt={3}>
        <Typography variant="h6">Upload Documents</Typography>
        <Grid container spacing={2}>
          {["cv", "coverLetter", "certificates"].map((docType, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {documents[docType]?.name || `Upload ${docType.replace(/([A-Z])/g, " $1")}`}
              </Typography>
              <Box border={1} p={2} borderRadius={2} textAlign="center">
                <input
                  type="file"
                  id={`upload-${docType}`}
                  style={{ display: "none" }}
                  onChange={(e) => handleDocumentUpload(e, docType)}
                />
                <label htmlFor={`upload-${docType}`}>
                  <Button variant="contained" component="span" color="primary">
                    Choose File
                  </Button>
                </label>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFileUpload}
          sx={{ mt: 2 }}
          disabled={isLoading || !isDocumentsUploaded}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Upload Documents"}
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleAutoApply}
          sx={{ mt: 2, ml: 2 }}
          disabled={!isDocumentsUploaded}
        >
          Start Auto-Apply
        </Button>
      </Box>

      {/* Success and Error Messages */}
      <Snackbar open={Boolean(successMessage)} autoHideDuration={4000} onClose={() => setSuccessMessage("")}>
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={Boolean(errorMessage)} autoHideDuration={4000} onClose={() => setErrorMessage("")}>
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
