import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [files, setFiles] = useState({
    cv: null,
    coverLetter: null,
    certificates: null,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    // File type validation (only PDF files)
    if (file && file.type !== 'application/pdf') {
      setMessage(`Only PDF files are allowed for ${name}.`);
      return;
    }

    // Optional: File size validation (max 5MB per file)
    if (file && file.size > 5 * 1024 * 1024) {
      setMessage(`${name} file size exceeds the 5MB limit.`);
      return;
    }

    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: file,
    }));
    setMessage(''); // Clear any previous message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required files are uploaded
    if (!files.cv || !files.coverLetter || !files.certificates) {
      setMessage('Please upload all required documents (CV, Cover Letter, and Certificates).');
      return;
    }

    const formData = new FormData();
    formData.append('cv', files.cv);
    formData.append('coverLetter', files.coverLetter);
    formData.append('certificates', files.certificates);

    setLoading(true);
    setMessage(''); // Clear any previous message

    try {
      const response = await axios.post('http://localhost:3001/api/upload-documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('File upload error:', error);
      setMessage('Error uploading files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Documents</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cv">CV</label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleFileChange}
            accept="application/pdf"
          />
        </div>
        <div>
          <label htmlFor="coverLetter">Cover Letter</label>
          <input
            type="file"
            id="coverLetter"
            name="coverLetter"
            onChange={handleFileChange}
            accept="application/pdf"
          />
        </div>
        <div>
          <label htmlFor="certificates">Certificates</label>
          <input
            type="file"
            id="certificates"
            name="certificates"
            onChange={handleFileChange}
            accept="application/pdf"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Files'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
