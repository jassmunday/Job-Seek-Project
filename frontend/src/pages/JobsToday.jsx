import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../../../admin/src/main";
Context
const ManageJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [isAuthorized,setIsAuthorized,user,setUser] = useContext(Context);
  const navigateTo = useNavigate();
  if (!isAuthorized ) {
    navigateTo("/");
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/job/getall",
          { withCredentials: true }
        );
        
        const today = new Date();
        const filteredJobs = data.jobs.filter(job => {
         
          const postedDate = new Date(job.postedOn);
    
          return (
            postedDate.getFullYear() === today.getFullYear() &&
            postedDate.getMonth() === today.getMonth() &&
            postedDate.getDate() === today.getDate()
          );
        });
        setMyJobs(filteredJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Today Posted Jobs</h1>
          {myJobs && myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map(element => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div>
                        <span>Title:</span>
                        <p>{element.title}</p>
                      </div>
                      <div>
                        <span>Location:</span>
                        <p>{element.location}</p>
                      </div>
                    </div>
                    <div className="button_wrapper">
                      {/* New Approve button */}
                      <button
                        onClick={() => handleApproveJob(element._id)}
                        className="approve_btn"
                      >
                        Disapprove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>There are No Jobs Posted Today.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageJobs;
