import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

const TopBar = () => {
  return (
    <div className="text-blue-950 bg-white py-1.5 w-full flex justify-between lg:px-20 sm:px-8 px-4 items-center  ">
      {/* Call Us */}
      <a
        href="tel:+94761257751"
        className="text-sm hover:opacity-80 transition-all duration-300"
      >
        Call us +94 76 125 7751
      </a>
      {/* Welcome Text */}
      <p className="text-sm hidden sm:block">
        Welcome to AjjiStore — your one-stop destination
      </p>
      {/* Social Media */}
      <div className="flex items-center gap-2">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:opacity-80 transition-all duration-300"
        >
          <FaSquareFacebook />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:opacity-80 transition-all duration-300"
        >
          <FaInstagramSquare />
        </a>
        <a
          href="https://www.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:opacity-80 transition-all duration-300"
        >
          <FaSquareWhatsapp />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
