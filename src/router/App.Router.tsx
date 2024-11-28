import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/auth/Auth';
import { RootState } from '../store/store';
import Dashboard from '../pages/home/Dashboard';




const AppRouter: React.FC = () => {
  const { isLoggedIn } = useSelector((state:RootState) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Route */}
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthPage />}
        />

        Dashboard Route 
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/auth" />}
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/auth'} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
