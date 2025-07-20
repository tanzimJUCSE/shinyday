import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DailyCheckin from './components/DailyCheckin';
import Dashboard from './pages/Dashboard';
import Layout from './Layout';
import './App.css';
import { AuthProvider } from './AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Landing from './Landing';
import ProtectedRoute from './ProtectedRoute';
import RedirectIfAuth from './RedirectIfAuth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<ProtectedRoute><DailyCheckin /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/signup" element={<RedirectIfAuth><SignUp /></RedirectIfAuth>} />
            <Route path="/signin" element={<RedirectIfAuth><SignIn /></RedirectIfAuth>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
// demo changes to track down
export default App; 