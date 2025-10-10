import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Wrap if not done in index.js
import { Toaster } from 'react-hot-toast'; // Import Toaster for rendering
import toast from 'react-hot-toast'; // Import toast functions
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NoteFlowDashboard from './Pages/Dashboard';
import NoteEditor from './Pages/NoteEditor';
import ProfilePage from './Pages/Profile';
import { axiosInstance } from './Lib/axios';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader from react-spinners

const App = () => {
  const [isLogin, setIsLogin] = useState(false); // Start false; we'll check immediately
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Function to check/update auth state (reusable) — NO forced navigate here
  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/user/verify", {
        withCredentials: true,
      });
      setIsLogin(res.data.loggedIn);
    } catch (err) {
      setIsLogin(false);
      // Redirect unauthorized access (non-root paths) to login
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function: API call + clear storage + update state + navigate + toast
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/user/logout', {}, { withCredentials: true });
      // Server clears cookie
      localStorage.removeItem('user'); // Clear cached data
      toast.success('Logged out successfully'); // Success toast
    } catch (error) {
      console.error('Logout error:', error);
      // Still proceed—cookie expires naturally
      localStorage.removeItem('user');
      toast.error('Logout failed. Please try again.'); // Error toast
    }
    
    // Immediately update state to trigger route switch
    setIsLogin(false);
    
    // Navigate to login
    navigate('/');
  };

  useEffect(() => {
    checkAuth();
  }, []); // Runs once on mount

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0' // Optional: light background
      }}>
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<NoteFlowDashboard handleLogout={handleLogout} />} />
            <Route path="/editor" element={<NoteEditor />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<Signup />} /> {/* Allow signup even when logged in */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login checkAuth={checkAuth} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>

      {/* Toaster component: Renders all toasts */}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </div>
  );
};

export default App;