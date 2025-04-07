import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiAddBoxFill } from "react-icons/ri";
import { MdGridView, MdBookmarkBorder } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='md:w-[220px] h-full flex flex-col items-end'>
      <ul className='hidden w-[180px] mt-12 md:flex flex-col gap-4'>

        <NavLink
          to='/add-product'
          className={({ isActive }) =>
            `border transition-all duration-300 flex items-center gap-2 p-2 cursor-pointer ${
              isActive ? 'bg-amber-50 text-blue-950' : 'text-blue-50 hover:bg-amber-50 hover:text-blue-950'
            }`
          }
        >
          <li className='flex items-center gap-2'><RiAddBoxFill /> ADD PRODUCT</li>
        </NavLink>

        <NavLink
          to='/view-product'
          className={({ isActive }) =>
            `border transition-all duration-300 flex items-center gap-2 p-2 cursor-pointer ${
              isActive ? 'bg-amber-50 text-blue-950' : 'text-blue-50 hover:bg-amber-50 hover:text-blue-950'
            }`
          }
        >
          <li className='flex items-center gap-2'><MdGridView /> VIEW PRODUCTS</li>
        </NavLink>

        <NavLink
          to='/orders'
          className={({ isActive }) =>
            `border transition-all duration-300 flex items-center gap-2 p-2 cursor-pointer ${
              isActive ? 'bg-amber-50 text-blue-950' : 'text-blue-50 hover:bg-amber-50 hover:text-blue-950'
            }`
          }
        >
          <li className='flex items-center gap-2'><MdBookmarkBorder /> ORDERS</li>
        </NavLink>

      </ul>
    </div>
  );
};

export default Sidebar;
