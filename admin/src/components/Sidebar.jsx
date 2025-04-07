import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiAddBoxFill } from "react-icons/ri";
import { MdGridView, MdBookmarkBorder } from "react-icons/md";


const Sidebar = () => {
  return (
    <div className='md:w-[220px] h-full flex flex-col items-end '>
      {/* Desktop Sidebar */}
      <ul className='hidden w-[180px] mt-12 md:flex flex-col gap-4'>
        <NavLink to='/' className="text-blue-50 hover:bg-amber-50 hover:text-blue-950 border transition-all duration-300">
          <li className='flex items-center gap-2 p-2 cursor-pointer'>
            <RiAddBoxFill /> ADD PRODUCT
          </li>
        </NavLink>
        <NavLink to='/' className="text-blue-50 hover:bg-amber-50 hover:text-blue-950 border transition-all duration-300">
          <li className='flex items-center gap-2 p-2 cursor-pointer'>
            <MdGridView /> VIEW PRODUCTS
          </li>
        </NavLink>
        <NavLink to='/' className="text-blue-50 hover:bg-amber-50 hover:text-blue-950 border transition-all duration-300">
          <li className='flex items-center gap-2 p-2 cursor-pointer'>
            <MdBookmarkBorder /> ORDERS
          </li>
        </NavLink>
      </ul>

     
    </div>
  );
};

export default Sidebar;
