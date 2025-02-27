import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

const ApplyForJobs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobPreferences: '',
  });
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits

    let formattedPhone = value;
    if (value.length >= 6) {
      formattedPhone = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
      formattedPhone = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }

    setFormData({ ...formData, phone: formattedPhone });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      if (name === 'resume') {
        setResume(files[0]);
      } else if (name === 'coverLetter') {
        setCoverLetter(files[0]);
      }
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid US phone number: (XXX) XXX-XXXX.';
    }

    if (!resume) newErrors.resume = 'Resume is required.';
    if (!coverLetter) newErrors.coverLetter = 'Cover letter is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const formDataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    if (resume) formDataToSubmit.append('resume', resume);
    if (coverLetter) formDataToSubmit.append('coverLetter', coverLetter);

    try {
      setIsSubmitting(true); // Disable the button while submitting
      const response = await fetch('http://localhost:3001/apply-job', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setFormData({ name: '', email: '', phone: '', jobPreferences: '' }); // Reset form data
        setResume(null); // Reset resume
        setCoverLetter(null); // Reset cover letter
        setErrors({});
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error submitting application');
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
  };

  return (
    <Box sx={{ textAlign: 'center', maxWidth: 600, margin: 'auto', p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Apply for Jobs</Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        sx={{ mb: 2 }}
        required
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        sx={{ mb: 2 }}
        required
      />

      <TextField
        fullWidth
        label="Phone (USA Only)"
        name="phone"
        value={formData.phone}
        onChange={handlePhoneChange}
        error={!!errors.phone}
        helperText={errors.phone}
        sx={{ mb: 2 }}
        required
      />

      <TextField
        fullWidth
        label="Job Preferences"
        name="jobPreferences"
        value={formData.jobPreferences}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Upload Resume (PDF/DOC)</Typography>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        {errors.resume && <Typography color="error">{errors.resume}</Typography>}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1">Upload Cover Letter (PDF/DOC)</Typography>
        <input type="file" name="coverLetter" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        {errors.coverLetter && <Typography color="error">{errors.coverLetter}</Typography>}
      </Box>

      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleSubmit} 
        disabled={isSubmitting} // Disable button while submitting
      >
        {isSubmitting ? <CircularProgress size={24} /> : "Apply"}
      </Button>
    </Box>
  );
};

export default ApplyForJobs;
