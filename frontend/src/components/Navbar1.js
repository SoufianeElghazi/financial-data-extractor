import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAccountBook, AiOutlineLogin } from 'react-icons/ai';
import logo from '../assets/logo.png';

const Navbar1 = () => {
  const [expand, setExpand] = useState(false);
  const [navColour, setNavColour] = useState(false);

  const scrollHandler = () => {
    if (window.scrollY >= 20) {
      setNavColour(true);
    } else {
      setNavColour(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navColour ? 'bg-opacity-90 backdrop-blur-md shadow-md' : 'bg-transparent'} bg-gray-800`}>
      <div className="flex justify-between items-center bg-teal-950 py-3 px-4 md:px-8">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} className="h-14 w-48 bg-cover" alt="brand" />
        </NavLink>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setExpand(!expand)}
        >
          <div className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${expand ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${expand ? 'opacity-0' : 'my-1'}`}></div>
          <div className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${expand ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
        <div className={`w-full md:flex md:items-center md:justify-end ${expand ? 'block' : 'hidden'} mt-4 md:mt-0`}>
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <NavLink 
              to="/" 
              className={({ isActive }) => `block py-2 md:py-2 md:px-4 text-white transition-colors duration-300 rounded-md mx-2 ${isActive ? 'bg-teal-900' : 'hover:bg-teal-700'}`}>
              <AiOutlineHome className="inline-block mb-1" /> Home
            </NavLink>
            <NavLink 
              to="/login" 
              className={({ isActive }) => `block py-2 md:py-2 md:px-4 text-white transition-colors duration-300 rounded-md mx-2 ${isActive ? 'bg-teal-900' : 'hover:bg-teal-700'}`}>
              <AiOutlineLogin className="inline-block mb-1" /> Login
            </NavLink>
            <NavLink 
              to="/signup" 
              className={({ isActive }) => `block py-2 md:py-2 md:px-4 text-white transition-colors duration-300 rounded-md mx-2 ${isActive ? 'bg-teal-900' : 'hover:bg-teal-700'}`}>
              <AiOutlineAccountBook className="inline-block mb-1" /> Signup
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
