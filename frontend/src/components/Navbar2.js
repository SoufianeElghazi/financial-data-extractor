import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiFillMoneyCollect, AiOutlineLogout ,AiOutlineSearch } from 'react-icons/ai';
import logo from '../assets/logo.png';

const Navbar2 = ({ onLogout }) => {
  const [expand, setExpand] = useState(false);
  const [navColour, setNavColour] = useState(false);
  const navigate = useNavigate();

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

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navColour ? 'bg-opacity-90 backdrop-blur-md shadow-md' : 'bg-transparent'} bg-gray-800`}>
      <div className="flex justify-between items-center bg-teal-950 py-3 px-4 md:px-8">
        <NavLink to="/about" className="flex items-center space-x-2">
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
              to="/about" 
              className={({ isActive }) => `block py-2 md:py-2 md:px-4 text-white transition-colors duration-300 rounded-md mx-2 ${isActive ? 'bg-teal-900' : 'hover:bg-teal-700'}`}>
              <AiOutlineUser className="inline-block mb-1" /> About
            </NavLink>
            <NavLink 
              to="/extract" 
              className={({ isActive }) => `block py-2 md:py-2 md:px-4 text-white transition-colors duration-300 rounded-md mx-2 ${isActive ? 'bg-teal-900' : 'hover:bg-teal-700'}`}>
              <AiFillMoneyCollect className="inline-block mb-1" /> Financial Extractor
            </NavLink>
            <NavLink 
              to="/search" 
              className={({ isActive }) => `block py-2 md:py-2 md:px-4 text-white transition-colors duration-300 rounded-md mx-2 ${isActive ? 'bg-teal-900' : 'hover:bg-teal-700'}`}>
              <AiOutlineSearch className="inline-block mb-1" /> Browse Financial Reports
            </NavLink>
            <button
              onClick={handleLogoutClick}
              className="block py-2 md:py-2 md:px-4 text-white transition-colors duration-300 rounded-md mx-2 hover:bg-teal-700">
              <AiOutlineLogout className="inline-block mb-1" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
