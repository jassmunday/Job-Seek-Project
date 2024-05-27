import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import { Context } from "../../main";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
//   const { isAuthorized ,user} = useContext(Context);
  //const navigateTo = useNavigate();
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
//   if (!isAuthorized) {
//     navigateTo("/");
//   }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL USER DETAILS</h1>
        <div className="banner">
          {users.users &&
            users.users.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.name}</p>
                  <p>{element.email}</p>
                  <p>{element.phone}</p>
                  <p>{element.role}</p>
                  
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;