import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddChordPage from './pages/AddChordPage';
import { checkAuth } from './services/authService';
import UsersPage from './pages/UsersPage';
import FingeringPage from './pages/FingeringPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    const authStatus = await checkAuth();
    setIsAuthenticated(authStatus);
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? (<Navigate to="/" replace />) : (<LoginPage onLoginSuccess={verifyAuth} />)
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? (<DashboardPage />) : (<Navigate to="/login" replace />)
          } 
        />
        <Route 
          path="/add-chord" 
          element={
            isAuthenticated ? (<AddChordPage />) : (<Navigate to="/login" replace />)
          } 
        />
        <Route 
          path="/users" 
          element={
            isAuthenticated ? (<UsersPage />) : (<Navigate to="/login" replace />)
          } 
        />
        <Route 
          path="/fingerings" 
          element={
            isAuthenticated ? (<FingeringPage />) : (<Navigate to="/login" replace />)
          } 
        />
      </Routes>
      
    </Router>
  );
}

export default App;