import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.jobs);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="jobs page py-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">All Jobs</h1>
        <input
          type="text"
          placeholder="Search by Job Title or Keyword"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 lg:w-1/3 p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block"
        />
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => (
              <div className="card bg-white p-6 rounded-lg shadow-md" key={element._id}>
                <p className="text-xl font-semibold mb-2">{element.title}</p>
                <p className="text-gray-600 mb-2">{element.category}</p>
                <p className="text-gray-600 mb-4">{element.country}</p>
                <Link to={`/job/${element._id}`} className="text-blue-500 hover:underline">
                  Job Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
