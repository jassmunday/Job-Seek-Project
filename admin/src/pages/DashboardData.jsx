import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import stylesheet for react-calendar

const DashboardData = () => {
  const [users, setUsers] = useState(0);
  const [jobs, setJobs] = useState(0);
  const [applications, setApplications] = useState(0);
  const [applicationData, setApplicationData] = useState([]);
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

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

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="admin page">
      <div className="container">
        <h1>Dashboard</h1>
        {/* Calendar component */}
        <div className="banner">
          <div className="card_ad">
            <div className="heading">
              <h3>Users</h3>
            </div>
            <div className="content">
              <h1>{users}</h1>
            </div>
          </div>
          <div className="card_ad">
            <div className="heading">
              <h3>Jobs</h3>
            </div>
            <div className="content">
              <h1>{jobs}</h1>
            </div>
          </div>
          <div className="card_ad">
            <div className="heading">
              <h3>Applications</h3>
            </div>
            <div className="content">
              <h1>{applications}</h1>
            </div>
          </div>
          <div style={{ width: "350px" }}>
            {" "}
            {/* Inline styles to set width and height */}
            <Calendar /> {/* Calendar component */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardData;
