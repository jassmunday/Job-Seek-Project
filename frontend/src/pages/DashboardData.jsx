import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import { Context } from "../../main";

const DashboardData = () => {
  const [users, setUsers] = useState(0);
  const [jobs, setJobs] = useState(0);
  const [applications, setApplications] = useState(0);
  const [applicationData, setApplicationData] = useState([]);

  useEffect(() => {
    // Fetch user data
    try {
      axios
        .get("http://localhost:5000/api/v1/user/getallusers", {
          withCredentials: true,
        })
        .then((res) => {
          setUsers(res.data.users.length);
        });
    } catch (error) {
      console.log(error);
    }

    // Fetch job data
    try {
      axios
        .get("http://localhost:5000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.jobs.length);
        });
    } catch (error) {
      console.log(error);
    }

    // Fetch application data
    try {
      axios
        .get("http://localhost:5000/api/v1/application/getAllApplications", {
          withCredentials: true,
        })
        .then((res) => {
          setApplicationData(res.data.applications);
          setApplications(res.data.applications.length);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  //   if (!isAuthorized) {
  //     navigateTo("/");
  //   }

  return (
    <section className="admin page">
      <div className="container">
        <h1>Dashboard</h1>
        <div className="banner">
          <div className="card">
            <div className="heading">
              <h3>Total Users</h3>
            </div>
            <div className="content">
              <h1>{users}</h1>
            </div>
          </div>
          <div className="card">
            <div className="heading">
              <h3>Total Jobs</h3>
            </div>
            <div className="content">
              <h1>{jobs}</h1>
            </div>
          </div>
          <div className="card">
            <div className="heading">
              <h3>Total Applications</h3>
            </div>
            <div className="content">
              <h1>{applications}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardData;
