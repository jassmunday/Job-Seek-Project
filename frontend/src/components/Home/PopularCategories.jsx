import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices className="text-4xl text-green-900" />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled className="text-4xl text-green-900" />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook className="text-4xl text-green-900" />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact className="text-4xl text-green-900" />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance className="text-4xl text-green-900" />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence className="text-4xl text-green-900" />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation className="text-4xl text-green-900" />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController className="text-4xl text-green-900" />,
    },
  ];
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-8">POPULAR CATEGORIES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((element) => {
            return (
              <div
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
                key={element.id}
              >
                <div className="icon mb-4">{element.icon}</div>
                <div className="text">
                  <p className="text-xl font-semibold mb-2">{element.title}</p>
                  <p className="text-gray-600">{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
