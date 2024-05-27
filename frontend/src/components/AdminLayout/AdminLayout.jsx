import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaUser,FaRegUser,FaIdBadge,FaHome } from "react-icons/fa";
import { AiFillIdcard } from "react-icons/ai";


function AdminLayout() {
  return (
    <>
      <nav className="navbarShow">
        <div className="container">
          <div className="logo">
            <img src="JobZee-logos__white.png" alt="Logo" />
          </div>
          <ul className="show-menu menu">
            <li>
              <NavLink to={"home"}><FaHome/>HOME</NavLink>
              </li>
            <li>
              <NavLink to={"manage-users"}><FaUser /> MANAGE USERS</NavLink>
            </li>
            <li>
              <NavLink to={"manage-jobs"}> <FaIdBadge/>MANAGE JOBS</NavLink>
            </li>
            <li>
              <NavLink to={"manage-applications"}> <AiFillIdcard /> MANAGE APPLICATIONS</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default AdminLayout;
