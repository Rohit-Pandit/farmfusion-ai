import { useState } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

import './App.css'

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/marketplace" element={<Marketplace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
