import React from "react";
import { Link } from "react-router-dom";

function HomeBar() {
  return (
    <>
      <nav className="navbarShow bg-black text-white">
        <div className="container flex justify-between items-center py-4">
          <div className="logo">
            <img src="/job_logo_new.png" alt="Logo" />
          </div>
          <ul className="show-menu menu flex space-x-4">
            <li>
              <Link
                to={"/login"}
                className="bg-green-900 hover:bg-gray-800 text-white px-4 py-4 transition duration-300 h-10"
              >
                LOGIN
              </Link>
            </li>
            <li>
              <Link
                to={"/register"}
                className="bg-green-900 hover:bg-gray-800  text-white px-4 py-4 rounded transition duration-300 h-10"
              >
                REGISTER
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default HomeBar;
