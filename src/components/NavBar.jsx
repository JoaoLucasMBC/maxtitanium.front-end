import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef();
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close the submenu when the location changes
    setOpenMenu(null);
  }, [location]);

  return (
    <nav ref={navRef} className="bg-blue-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">Max Titanium</div>
      <ul className="flex space-x-4">
        <li className="relative">
          <div onClick={() => toggleMenu('order')} className="text-white cursor-pointer">Order</div>
          {openMenu === 'order' && (
            <ul className="absolute left-0 bg-blue-800 mt-1">
              <li><Link to="/create-order" className="block text-gray-300 hover:text-white py-1 px-4">Create</Link></li>
              <li><Link to="/list-order" className="block text-gray-300 hover:text-white py-1 px-4">List</Link></li>
            </ul>
          )}
        </li>
        <li className="relative">
          <div onClick={() => toggleMenu('product')} className="text-white cursor-pointer">Product</div>
          {openMenu === 'product' && (
            <ul className="absolute left-0 bg-blue-800 mt-1">
              <li><Link to="/create-product" className="block text-gray-300 hover:text-white py-1 px-4">Create</Link></li>
              <li><Link to="/list-product" className="block text-gray-300 hover:text-white py-1 px-4">List</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
