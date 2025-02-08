// src/components/JobStatus.js
import React, { useState } from 'react';

const JobStatus = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/get-status?email=${email}`);
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error fetching status:', error);
      alert('Error fetching job status');
    }
  };

  return (
    <div>
      <h2>Check Job Application Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Check Status</button>
      </form>

      {status && (
        <div>
          <h3>Status</h3>
          {status.length > 0 ? (
            status.map((app, index) => (
              <div key={index}>
                <p>Job Title: {app.jobTitle}</p>
                <p>Company: {app.company}</p>
                <p>Status: {app.status}</p>
              </div>
            ))
          ) : (
            <p>No job applications found for this email.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobStatus;
