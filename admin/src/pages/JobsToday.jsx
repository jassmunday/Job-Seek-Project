

import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
//import './ManageJobs.css'; // Make sure to import the CSS

const JobsToday = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const [myJobs, setMyJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/job/getall",
          { withCredentials: true }
        );
        setMyJobs(data.jobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

 const handleApproveJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    if (updatedJob) {
      updatedJob.expired = true;
      await axios
        .put(`http://localhost:5000/api/v1/job/updatebyadmin/${jobId}`, updatedJob, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success("Job has been marked as expired.");
          setMyJobs((prevJobs) =>
            prevJobs.map((job) =>
              job._id === jobId ? { ...job, expired: true } : job
            )
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="myJobs_j page_j">
      <div className="container_j">
        <h1>All Posted Jobs</h1>
        {myJobs && myJobs.length > 0 ? (
          <table className="jobs-table_j">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myJobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>
                    <button
                      onClick={() => handleApproveJob(job._id)}
                      className="approve_btn_j"
                    >
                      Disapprove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>There are No Jobs Posted Today.</p>
        )}
      </div>
    </div>
  );
};

export default JobsToday;
