import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PurchaseOrders from './pages/PurchaseOrders';
import Vendors from './pages/Vendors';
import Alerts from './pages/Alerts';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<PurchaseOrders />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="alerts" element={<Alerts />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
