import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">How Job Seek Works</h1>
        <div className="flex flex-col lg:flex-row justify-around items-center">
          <div className="card bg-white shadow-lg rounded-lg p-8 m-4 text-center h-64">
            <FaUserPlus className="text-green-900 text-5xl mb-4" />
            <p className="text-xl font-semibold mb-2">Create Account</p>
            <p className="text-gray-600">
              Create a new account as Employer or Job Seeker to avail the services provided by us.
            </p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-8 m-4 text-center h-64">
            <MdFindInPage className="text-green-900 text-5xl mb-4" />
            <p className="text-xl font-semibold mb-2">Find a Job/Post a Job</p>
            <p className="text-gray-600">
              You can get the Job according to your profile and Post a job accordingto your requirement.
            </p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-8 m-4 text-center h-64">
            <IoMdSend className="text-green-900 text-5xl mb-4" />
            <p className="text-xl font-semibold mb-2">Apply For Job/Recruit Suitable Candidates</p>
            <p className="text-gray-600">
              Apply for the Jobs with your latest resume or Hire the suitable candidate after reviewing the profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
