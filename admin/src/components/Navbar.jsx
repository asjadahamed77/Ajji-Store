import React from "react";
import logo from "../assets/logo/AjjiStore.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthState, logout } from "../redux/slices/adminSlice";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RiAddBoxFill } from "react-icons/ri";
import { MdGridView, MdBookmarkBorder } from "react-icons/md";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearAuthState());
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b relative z-50">
      {/* Menu Icon for Mobile */}
      <div onClick={() => setShowSidebar(true)} className="md:hidden">
        <HiOutlineMenuAlt4 className="text-2xl cursor-pointer text-blue-50" />
      </div>

      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Admin" className="w-32 sm:w-40" />
      </Link>

      {/* Logout Button */}
      <button
        onClick={logoutHandler}
        className="uppercase text-sm font-semibold bg-white text-blue-950 px-4 py-1.5 hover:opacity-75 duration-300 transition-all rounded-full"
      >
        LOGOUT
      </button>

      {/* Overlay & Sidebar for Mobile */}
      {showSidebar && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0  backdrop-blur-2xl transition-opacity duration-300"
          />

          {/* Sidebar */}
          <div
            className={`relative bg-white/30  h-full p-4  transition-all  duration-300  ${
              showSidebar ? "translate-x-0 w-[280px]" : "-translate-x-full"
            }`}
          >
            {/* Close Icon */}
            <p
              onClick={() => setShowSidebar(false)}
              className="flex justify-end text-white text-3xl mb-4 cursor-pointer"
            >
              <IoClose />
            </p>

            {/* Sidebar Menu */}
            <ul className="flex flex-col gap-4 mt-12 text-white">
              <NavLink to="/add-product" onClick={() => setShowSidebar(false)}>
                <li className="flex items-center gap-2 p-2 border hover:bg-amber-50 hover:text-blue-950 transition-all duration-300">
                  <RiAddBoxFill /> ADD PRODUCT
                </li>
              </NavLink>
              <NavLink to="/view-product" onClick={() => setShowSidebar(false)}>
                <li className="flex items-center gap-2 p-2 border hover:bg-amber-50 hover:text-blue-950 transition-all duration-300">
                  <MdGridView /> VIEW PRODUCTS
                </li>
              </NavLink>
              <NavLink to="/orders" onClick={() => setShowSidebar(false)}>
                <li className="flex items-center gap-2 p-2 border hover:bg-amber-50 hover:text-blue-950 transition-all duration-300">
                  <MdBookmarkBorder /> ORDERS
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
