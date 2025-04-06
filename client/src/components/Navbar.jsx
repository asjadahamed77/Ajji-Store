import React, { useState } from 'react';
import logo from '../assets/logo/AjjiStore.png';
import { Link, NavLink } from 'react-router-dom';
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { CgMenuLeft } from "react-icons/cg";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Mobiles', path: '/mobiles' },
    { name: 'MacBooks', path: '/macbooks' },
    { name: 'Laptops', path: '/laptops' },
    { name: 'iPads', path: '/ipads' },
    { name: 'AirPods', path: '/airpods' },
    { name: 'Watches', path: '/watches' },
    { name: 'Accessories', path: '/accessories' },
  ];

  return (
    <div className="flex items-center justify-between p-2 lg:px-8 px-4 border-b-2 border-white relative">
      
      {/* Mobile Menu Icon */}
      <div className="lg:hidden text-2xl cursor-pointer" onClick={() => setMobileMenuOpen(true)}>
        <CgMenuLeft />
      </div>

      {/* Logo */}
      <Link to={'/'}>
        <img src={logo} alt="Ajji-Store" className="sm:w-36 w-32" />
      </Link>

      {/* Desktop Links */}
      <ul className="lg:flex items-center gap-4 hidden">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `uppercase text-sm transition-all duration-300 ${
                  isActive ? 'text-white underline' : 'text-gray-300 hover:opacity-80 hover:underline'
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Cart, Profile, Login */}
      <div className="flex items-center gap-4">
        <div className="text-xl hover:opacity-80 transition-all duration-300 cursor-pointer">
          <IoMdCart />
        </div>
        <div className="text-lg hover:opacity-80 transition-all duration-300 cursor-pointer">
          <FaUser />
        </div>
        <button className="text-sm text-blue-950 bg-white px-4 py-1 font-semibold rounded-full cursor-pointer hover:opacity-80 transition-all duration-300">
          LOGIN
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-6 text-white text-xl font-semibold">
          {/* Close area */}
          <div
            className="absolute top-4 right-6 text-2xl cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </div>

          {/* Mobile Links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `uppercase text-lg transition-all duration-300 ${
                  isActive ? 'text-white underline' : 'text-gray-300 hover:opacity-80 hover:underline'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
