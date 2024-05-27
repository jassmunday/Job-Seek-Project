import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUser,FaRegUser,FaIdBadge,FaHome } from "react-icons/fa";
import toast from 'react-hot-toast';
import { AiFillIdcard } from "react-icons/ai";
import { Context } from "../../main";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function AdminLayout() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      navigateTo("/");
      setIsAuthorized(false);
    } catch (error) {
      toast.error(response.data.message);
      setIsAuthorized(true);
    }
  };
  return (
    <>
      <nav className={isAuthorized ? "navbarShow"    : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="/job_logo_new.png" alt="Logo" />
          </div>
          <ul className="show-menu menu">
            <li>
              <NavLink to={"admin/home"}>
                <FaHome />
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to={"admin/users"}>
                <FaUser /> MANAGE USERS
              </NavLink>
            </li>
            <li>
              <NavLink to={"admin/jobs"}>
                {" "}
                <FaIdBadge />
                MANAGE JOBS
              </NavLink>
            </li>
            <li>
              <NavLink to={"admin/applications"}>
                {" "}
                <AiFillIdcard /> MANAGE APPLICATIONS
              </NavLink>
            </li>
            <button onClick={handleLogout}>LOGOUT</button>
          </ul>
          
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default AdminLayout;
