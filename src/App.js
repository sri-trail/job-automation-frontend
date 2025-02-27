import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home'; // Home page
import SignUp from './pages/SignUp'; // SignUp page
import LogIn from './pages/LogIn'; // LogIn page
import Dashboard from './pages/Dashboard'; // After login page
import ContactUs from './pages/ContactUs'; // Contact page
import About from './pages/About'; // About Us page
import ApplyForJobs from './pages/ApplyForJobs'; // Apply for Jobs page
import JobStatus from './pages/JobStatus'; // Job Status page
import Terms from './pages/Terms'; // Terms page
import Layout from './components/Layout'; // Layout component (optional)

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Handle log out
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact-us" element={<ContactUs />} />
          
          {/* Protected routes */}
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard setIsLoggedIn={setIsLoggedIn} onLogout={handleLogout} />} />
              <Route path="/about" element={<About />} />
              <Route path="/apply-for-jobs" element={<ApplyForJobs />} />
              <Route path="/jobstatus" element={<JobStatus />} />
              <Route path="/terms" element={<Terms />} />
            </>
          ) : (
            // Redirect to login if not logged in
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
