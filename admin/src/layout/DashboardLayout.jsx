// src/components/DashboardLayout.jsx
import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex h-[93vh] overflow-y-scroll">
        <div className="h-full md:border-r">
          <Sidebar />
        </div>
        <div className="flex-grow h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
