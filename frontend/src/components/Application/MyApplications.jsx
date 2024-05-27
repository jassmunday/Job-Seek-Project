import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
//import EmailForm from "./EmailForm";
import MyForm from "./MyForm";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get(
            "http://localhost:5000/api/v1/application/employer/getApplications",
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get(
            "http://localhost:5000/api/v1/application/jobseeker/getApplications",
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:5000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredApplications = applications.filter((application) =>
    application.coverLetter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    application.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="my_applications page">
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">
          {user && user.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
        </h1>
        <input
          type="text"
          placeholder="Search by Name or Job Role"
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/4 p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {filteredApplications.length <= 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          filteredApplications.map((element) => (
            user.role === "Job Seeker" ? (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ) : (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            )
          ))
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card mb-4 p-4 border border-gray-200 rounded-lg">
      <div className="detail mb-4">
        <p>
          <span className="font-semibold">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {element.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {element.phone}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {element.address}
        </p>
        <p>
          <span className="font-semibold">Job Title and Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume mb-4">
        <img
          src={element.resume.url}
          alt="resume"
          className="cursor-pointer"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button
          onClick={() => deleteApplication(element._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card mb-4 p-4 border border-gray-200 rounded-lg">
      <div className="detail mb-4">
        <p>
          <span className="font-semibold">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {element.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {element.phone}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {element.address}
        </p>
        <p>
          <span className="font-semibold">Job Title and Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume mb-4">
        <img
          src={element.resume.url}
          alt="resume"
          className="cursor-pointer"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="resume">
        <MyForm email={element.email} />
        {/* <EmailForm receiverEmail={element.email}/> */}
      </div>
    </div>
  );
};
