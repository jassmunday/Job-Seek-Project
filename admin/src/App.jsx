import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Toaster } from "react-hot-toast";
import ManageJobs from "./pages/ManageJobs";
import ManageApplications from "./pages/ManageApplications";
import ManageUsers from "./pages/ManageUsers";
//import Home from './components/Home/Home';
//import NavBar from './components/Layout/NavBar';
//import AdminLogin from './components/Auth/AdminLogin';
import AdminHome from './pages/AdminHome';
import AdminLogin from './components/Auth/AdminLogin';
import AdminLayout from './components/Layout/AdminLayout';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <AdminLayout/>
      <Routes>
        <Route path="/" element={<AdminLogin/>}/>
        <Route path="/admin/home" element={<AdminHome/>} />
        <Route path="/admin/users" element={< ManageUsers/>} />
        <Route path="/admin/jobs" element={< ManageJobs/>} />
        <Route path="/admin/applications" element={< ManageApplications/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
      
    </>
  )
}

export default App
