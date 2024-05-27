import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import JobsToday from "./JobsToday";
import DashboardData from "./DashboardData";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {

  const {isAuthorized,setIsAuthorized,user,setUser} = useContext(Context);
  const navigateTo = useNavigate();
  if (!isAuthorized ) {
    navigateTo("/");
  }
  // const [users, setUsers] = useState(0);
  // const [jobs, setJobs] = useState(0);
  // const [applications, setApplications] = useState(0);
  // const [applicationData, setApplicationData] = useState([]);

  // useEffect(() => {
  //   // Fetch user data
  //   try {
  //     axios
  //       .get("http://localhost:5000/api/v1/user/getallusers", {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         setUsers(res.data.users.length);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // Fetch job data
  //   try {
  //     axios
  //       .get("http://localhost:5000/api/v1/job/getall", {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         setJobs(res.data.jobs.length);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // Fetch application data
  //   try {
  //     axios
  //       .get("http://localhost:5000/api/v1/application/getAllApplications", {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         setApplicationData(res.data.applications);
  //         setApplications(res.data.applications.length);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <>
      <DashboardData/>
      <JobsToday/>
    </>
  );
};

export default AdminHome;
