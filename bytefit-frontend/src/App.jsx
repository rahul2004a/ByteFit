import './App.css'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from './store/authSlice';
import ActivityDetail from './components/ActivityDetail';
import DashboardPage from './pages/DashboardPage';
import AddActivityPage from './pages/AddActivityPage';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function App() {
  const { token, tokenData } = useContext(AuthContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [localToken, setLocalToken] = useState(localStorage.getItem('token'));
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setLocalToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (token && tokenData) {
      dispatch(setCredentials({ token, user: tokenData }));

      // Show welcome toast for new login (not on page refresh)
      if (!hasShownWelcome && tokenData?.preferred_username) {
        toast.success(`Welcome back, ${tokenData.preferred_username}! 🎉`, {
          duration: 4000,
          position: 'top-center',
          style: {
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '12px 20px',
            boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)',
          }
        });
        setHasShownWelcome(true);
      }
    } else if (!token && (user || localToken)) {
      // If OAuth token is cleared but Redux/localStorage still has data, clear everything
      dispatch(logout());
      setLocalToken(null);
      setHasShownWelcome(false);
    }
  }, [token, tokenData, dispatch, user, localToken, hasShownWelcome]);

  return (
    <Router>
      <Navbar />
      <Box className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-activity" element={<AddActivityPage />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
        </Routes>
      </Box>
      <Toaster />
    </Router>
  )
}

export default App
