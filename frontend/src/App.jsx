import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJobs";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";

// Admin Panel Layouts
import AdminLayout from "./components/AdminLayout/AdminLayout";
import ManageJobs from "./pages/ManageJobs";
import ManageApplications from "./pages/ManageApplications";
import ManageUsers from "./pages/ManageUsers";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./components/Auth/AdminLogin";
// Admin Panel Layout

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin Panel Routes Statred */}
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<AdminHome />} />  
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="manage-applications" element={<ManageApplications />} />
          </Route>
          {/* Admin Panel Routes Ended */}
        </Routes>
        <Footer />
        <Routes>
          
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
