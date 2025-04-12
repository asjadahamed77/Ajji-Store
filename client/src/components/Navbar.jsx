import React, { useState } from 'react';
import logo from '../assets/logo/AjjiStore.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { CgMenuLeft } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = ({setShowUserProfile}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state)=> state.auth)
  

  const logoutHandler = ()=>{
    dispatch(logout())
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Mobiles', path: '/products/mobile' },
    { name: 'MacBooks', path: '/products/macbook' },
    { name: 'Laptops', path: 'products/laptop' },
    { name: 'iPads', path: 'products/ipad' },
    { name: 'tablets', path: 'products/tablet' },
    { name: 'AirPods', path: 'products/airpod' },
    { name: 'Watches', path: 'products/watch' },
    { name: 'Accessories', path: 'products/accessory' },
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
                `uppercase text-xs xl:text-sm transition-all duration-300 ${
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
        {
            user? (
               <>
                <div className="text-xl hover:opacity-80 transition-all duration-300 cursor-pointer">
          <IoMdCart />
        </div>
        <div onClick={()=>setShowUserProfile(true)} className="text-lg hover:opacity-80 transition-all duration-300 cursor-pointer">
          <FaUser />
        </div>
               </>
            ) : ("")
        }
       {
        user ? (
            <button onClick={logoutHandler}  className="text-sm text-blue-950 bg-white px-4 py-1 font-semibold rounded-full cursor-pointer hover:opacity-80 transition-all duration-300">
          LOGOUT
            </button>
        ) : (
            <button onClick={()=>navigate('/login')} className="text-sm text-blue-950 bg-white px-4 py-1 font-semibold rounded-full cursor-pointer hover:opacity-80 transition-all duration-300">
          LOGIN
            </button>
        )
       }
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
