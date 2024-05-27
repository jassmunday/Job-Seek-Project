import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myjobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:5000/api/v1/job/update/${jobId}`, updatedJob, {
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

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:5000/api/v1/job/delete/${jobId}`, {
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
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page py-8 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Posted Jobs</h1>
          {myJobs && myJobs.length > 0 ? (
            <>
              <div className="grid gap-6">
                {myJobs.map((element) => (
                  <div className="card bg-white p-6 rounded-lg shadow-md" key={element._id}>
                    <div className="content">
                      <div className="short_fields grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="block font-semibold">Title:</span>
                          <input
                            type="text"
                            className={`w-full p-2 border rounded ${
                              editingMode !== element._id ? "bg-gray-200" : "bg-white"
                            }`}
                            disabled={editingMode !== element._id}
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(element._id, "title", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span className="block font-semibold">Country:</span>
                          <input
                            type="text"
                            className={`w-full p-2 border rounded ${
                              editingMode !== element._id ? "bg-gray-200" : "bg-white"
                            }`}
                            disabled={editingMode !== element._id}
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(element._id, "country", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span className="block font-semibold">City:</span>
                          <input
                            type="text"
                            className={`w-full p-2 border rounded ${
                              editingMode !== element._id ? "bg-gray-200" : "bg-white"
                            }`}
                            disabled={editingMode !== element._id}
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(element._id, "city", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span className="block font-semibold">Category:</span>
                          <select
                            className={`w-full p-2 border rounded ${
                              editingMode !== element._id ? "bg-gray-200" : "bg-white"
                            }`}
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(element._id, "category", e.target.value)
                            }
                            disabled={editingMode !== element._id}
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
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </select>
                        </div>
                        <div>
                          <span className="block font-semibold">
                            Salary:{" "}
                            {element.fixedSalary ? (
                              <input
                                type="number"
                                className={`w-full p-2 border rounded ${
                                  editingMode !== element._id ? "bg-gray-200" : "bg-white"
                                }`}
                                disabled={editingMode !== element._id}
                                value={element.fixedSalary}
                                onChange={(e) =>
                                  handleInputChange(element._id, "fixedSalary", e.target.value)
                                }
                              />
                            ) : (
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  className={`w-1/2 p-2 border rounded ${
                                    editingMode !== element._id ? "bg-gray-200" : "bg-white"
                                  }`}
                                  disabled={editingMode !== element._id}
                                  value={element.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(element._id, "salaryFrom", e.target.value)
                                  }
                                />
                                <input
                                  type="number"
                                  className={`w-1/2 p-2 border rounded ${
                                    editingMode !== element._id ? "bg-gray-200" : "bg-white"
                                  }`}
                                  disabled={editingMode !== element._id}
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(element._id, "salaryTo", e.target.value)
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          <span className="block font-semibold">Expired:</span>
                          <select
                            className={`w-full p-2 border rounded ${
                              editingMode !== element._id ? "bg-gray-200" : "bg-white"
                            }`}
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(element._id, "expired", e.target.value)
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field mb-4">
                        <div className="mb-4">
                          <span className="block font-semibold">Description:</span>
                          <textarea
                            rows={5}
                            className={`w-full p-2 border rounded ${
                              editingMode !== element._id ? "bg-gray-200" : "bg-white"
                            }`}
                            disabled={editingMode !== element._id}
                            value={element.description}
                            onChange={(e) =>
                              handleInputChange(element._id, "description", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <span className="block font-semibold">Location: </span>
                          <textarea
                            rows={5}
                            className={`w-full p-2 border rounded ${
                              editingMode !== element._id ? "bg-gray-200" : "bg-white"
                            }`}
                            disabled={editingMode !== element._id}
                            value={element.location}
                            onChange={(e) =>
                              handleInputChange(element._id, "location", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper flex justify-between items-center mt-4">
                      <div className="edit_btn_wrapper flex gap-2">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn bg-green-500 text-white p-2 rounded hover:bg-green-600"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className="delete_btn bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
