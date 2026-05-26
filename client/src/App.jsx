import { useState } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import CreateCrop from './pages/CreateCrop.jsx';
import EditCrop from './pages/EditCrop.jsx';
import CropDetails from './pages/CropDetails.jsx';

import './App.css'

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/marketplace" element={<Marketplace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/create-crop" element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <CreateCrop />
          </ProtectedRoute>
        } />

        <Route path="/edit-crop/:id" element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <EditCrop />
          </ProtectedRoute>
        } />
      </Routes>

      <Routes>
        <Route path="/crops/:id" element={<CropDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
