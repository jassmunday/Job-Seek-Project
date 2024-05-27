import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { FaUser } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/v1/user/getallusers", {
          withCredentials: true,
        })
        .then((res) => {
          setUsers(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page py-10 px-6 bg-[#f1f3f6] min-h-screen">
      <div className="container mx-auto max-w-7xl">
        
        <div className="banner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.users && users.users.length > 0 ? (
            users.users.map((element) => (
              <div className="card bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-between" key={element._id}>
                <div>
                  <FaUser className="text-4xl text-blue-500 mb-4 mx-auto" />
                  <p className="text-lg font-semibold text-gray-700">{element.name}</p>
                  <p className="text-gray-600">{element.email}</p>
                  <p className="text-gray-600">{element.phone}</p>
                  <p className="text-gray-600">{element.role}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No users found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
