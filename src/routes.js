import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './renderer/components/Dashboard';
import LogViewer from './renderer/components/LogViewer';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/logs" element={<LogViewer />} />
    </Routes>
  );
}