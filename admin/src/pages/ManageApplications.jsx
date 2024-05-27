import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import ResumeModal from "../components/Application/ResumeModal";
import { useNavigate } from "react-router-dom";
const ManageApplications = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/v1/application/getAllApplications", {
          withCredentials: true,
        })
        .then((res) => {
          setApplications(res.data.applications);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/application/delete-admin/${id}`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleDetails = (application) => {
    setSelectedApplication(application === selectedApplication ? null : application);
  };

  return (
    <section className="my_applications page py-10 px-6 bg-gray-100">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">All Job Applications</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <React.Fragment key={application._id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{application.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{application.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{application.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{application.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => toggleDetails(application)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {selectedApplication === application ? "Hide Details" : "Show Details"}
                      </button>
                    </td>
                  </tr>
                  {selectedApplication === application && (
                    <tr>
                      <td colSpan="5">
                        <div className="p-6">
                          <p className="font-medium">Cover Letter:</p>
                          <p>{application.coverLetter}</p>
                          <div className="mt-4">
                            <p className="font-medium">Resume:</p>
                            <img
                              src={application.resume.url}
                              alt="resume"
                              className="cursor-pointer max-w-24"
                              onClick={() => openModal(application.resume.url)}
                            />
                          </div>
                          <div className="mt-4">
                            <button
                              onClick={() => deleteApplication(application._id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                              Delete Application
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpen && <ResumeModal imageUrl={selectedApplication?.resume.url} onClose={closeModal} />}
    </section>
  );
};

export default ManageApplications;
