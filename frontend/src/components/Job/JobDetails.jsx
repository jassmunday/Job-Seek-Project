import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="jobDetail_sc page_sc">
      <div className="container_sc">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Details</h1>
        <div className="banner_sc">
          <table className="jobDetailsTable_sc">
            <tbody>
              <tr>
                <td>Title:</td>
                <td>{job.title}</td>
              </tr>
              <tr>
                <td>Category:</td>
                <td>{job.category}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{job.country}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{job.city}</td>
              </tr>
              <tr>
                <td>Location:</td>
                <td>{job.location}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{job.description}</td>
              </tr>
              <tr>
                <td>Job Posted On:</td>
                <td>{job.jobPostedOn}</td>
              </tr>
              <tr>
                <td>Salary:</td>
                <td>
                  {job.fixedSalary ? (
                    job.fixedSalary
                  ) : (
                    `${job.salaryFrom} - ${job.salaryTo}`
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {user && user.role !== "Employer" && (
            <Link to={`/application/${job._id}`} className="applyLink_sc">
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
