import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar1 from './components/Navbar1.js';
import Navbar2 from './components/Navbar2.js';
import Footer from './components/Footer';
import Preload from './components/Preload';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import FinanceExtract from './pages/FinanceExtract.js';
import Search from './pages/Search';

function App() {
  const [load, updateLoad] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if user is logged in by checking local storage or a token
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken'); // Remove token on logout
  };

  return (
    <Router>
      <Preload load={load}></Preload>
      <div className="App" id={load ? "no-scroll" : "scroll"}></div>
      {isLoggedIn ? <Navbar2 onLogout={handleLogout} /> : <Navbar1 />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
        <Route path="/extract" element={isLoggedIn ? <FinanceExtract /> : <Navigate to="/login" />} />
        <Route path="/search" element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
