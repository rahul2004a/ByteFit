import './App.css'
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/authSlice';

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the Fitness Tracker App
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Please login to access your activities
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => {
            logIn();
          }}>
            LOGIN
          </Button>
        </Box>
      ) : (
        <div>
          <pre>{JSON.stringify(tokenData, null, 2)}</pre>
          <pre>{JSON.stringify(token, null, 2)}</pre>
        </div>
      )}
    </Router>
  )
}

export default App
