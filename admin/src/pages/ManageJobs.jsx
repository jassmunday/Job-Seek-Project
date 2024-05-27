import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";

const ManageJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Fetching all jobs
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

  // Function for enabling editing mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function for disabling editing mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function for updating the job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:5000/api/v1/job/updatebyadmin/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // Function for deleting job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:5000/api/v1/job/deletebyadmin/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page py-10 px-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Posted Jobs</h1>
        {myJobs && myJobs.length > 0 ? (
          <div className="banner grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myJobs.map((element) => (
              <div
                className="card bg-gray-300 border border-black rounded-lg shadow-md p-6"
                key={element._id}
              >
                <div className="content">
                  <div className="short_fields grid grid-cols-1 gap-4">
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Title:</label>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                        className="input bg-gray-100 border border-gray-300 rounded-lg p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Country:</label>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(element._id, "country", e.target.value)
                        }
                        className="input bg-gray-100 border border-gray-300 rounded-lg p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">City:</label>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                        className="input bg-gray-100 border border-gray-300 rounded-lg p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Category:</label>
                      <select
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(element._id, "category", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        className="input bg-gray-100 border border-gray-300 rounded-lg p-2"
                      >
                        <option value="Graphics & Design">
                          Graphics & Design
                        </option>
                        <option value="Mobile App Development">
                          Mobile App Development
                        </option>
                        <option value="Frontend Web Development">
                          Frontend Web Development
                        </option>
                        <option value="MERN Stack Development">
                          MERN Stack Development
                        </option>
                        <option value="Account & Finance">
                          Account & Finance
                        </option>
                        <option value="Artificial Intelligence">
                          Artificial Intelligence
                        </option>
                        <option value="Video Animation">Video Animation</option>
                        <option value="MEAN Stack Development">
                          MEAN Stack Development
                        </option>
                        <option value="MEVN Stack Development">
                          MEVN Stack Development
                        </option>
                        <option value="Data Entry Operator">
                          Data Entry Operator
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Salary:</label>
                      {element.fixedSalary ? (
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.fixedSalary}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "fixedSalary",
                              e.target.value
                            )
                          }
                          className="input bg-gray-100 border border-gray-300 rounded-lg p-2"
                        />
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "salaryFrom",
                                e.target.value
                              )
                            }
                            className="input bg-gray-100 border border-gray-300 rounded-lg p-2"
                          />
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "salaryTo",
                                e.target.value
                              )
                            }
                            className="input bg-gray-100 border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Expired:</label>
                      <select
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(element._id, "expired", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        className="input bg-gray-100 border border-gray-300 rounded-lg p-2"
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div>
                  </div>
                  <div className="long_field mt-4">
                    <div className="flex flex-col mb-4">
                      <label className="font-semibold mb-1">Description:</label>
                      <textarea
                        rows={5}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "description",
                            e.target.value
                          )
                        }
                        className="textarea bg-gray-100 border border-gray-300 rounded-lg p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Location:</label>
                      <textarea
                        rows={5}
                        value={element.location}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "location",
                            e.target.value
                          )
                        }
                        className="textarea bg-gray-100 border border-gray-300 rounded-lg p-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="button_wrapper mt-6 flex justify-between">
                  <div className="edit_btn_wrapper flex items-center gap-4">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="check_btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="cross_btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="edit_btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="delete_btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            You've not posted any job or maybe you deleted all of your jobs!
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
