import React, { useContext, useEffect, useState } from "react";
//import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "../components/Application/ResumeModal";

const ManageApplications = () => {
  //const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

 // const { isAuthorized } = useContext(Context);
  //const navigateTo = useNavigate();


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

  // useEffect(() => {
  //   try {
  //     if (user && user.role === "Employer") {
  //       axios
  //         .get("http://localhost:5000/api/v1/application/employer/getApplications", {
  //           withCredentials: true,
  //         })
  //         .then((res) => {
  //           setApplications(res.data.applications);
  //         });
  //     } else {
  //       axios
  //         .get("http://localhost:5000/api/v1/application/jobseeker/getApplications", {
  //           withCredentials: true,
  //         })
  //         .then((res) => {
  //           setApplications(res.data.applications);
  //         });
  //     }
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // }, [isAuthorized]);

  // if (!isAuthorized) {
  //   navigateTo("/");
  // }
  
  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:5000/api/v1/application/delete-admin/${id}`, {
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

  return (
    <section className="my_applications page">
        <div className="container">
          <h1>All Job Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default ManageApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};
