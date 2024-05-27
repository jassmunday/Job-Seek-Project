import React from "react";
import { FaBell } from "react-icons/fa";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "World With Web",
      location: "Ludhiana, India",
      openPositions: 3,
      icon: <FaBell className="text-4xl text-green-900" />,
    },
    {
      id: 2,
      title: "Aptech Learning",
      location: "Punjab, India",
      openPositions: 2,
      icon: <FaBell className="text-4xl text-green-900" />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Hyderabad, India",
      openPositions: 1,
      icon: <FaBell className="text-4xl text-green-900" />,
    },
  ];
  return (
    <div className="bg-gray-100 py-16 px-6">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">TOP COMPANIES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((element) => {
            return (
              <div
                className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center"
                key={element.id}
              >
                <div className="mb-6">{element.icon}</div>
                <div className="text mb-4">
                  <p className="text-xl font-semibold mb-2">{element.title}</p>
                  <p className="text-gray-600">{element.location}</p>
                </div>
                <button className="bg-green-900 text-white px-4 py-2 rounded-full">
                  Open Positions {element.openPositions}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
