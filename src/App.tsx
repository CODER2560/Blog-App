import React from 'react';
import logo from './logo.svg';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Feed from './pages/Feed/Feed';
import Create from './pages/Create/Create';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/create" element={<Create />} />
      {/* Add more routes as needed */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
