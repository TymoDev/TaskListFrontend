import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar";

interface LayoutProps {
  hideNavbar?: boolean; 
}

const LayoutNavbar: React.FC<LayoutProps> = ({ hideNavbar = false }) => {
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default LayoutNavbar;
