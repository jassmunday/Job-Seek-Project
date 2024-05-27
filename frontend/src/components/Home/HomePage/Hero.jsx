import React from "react";
import { HiSearch } from "react-icons/hi";
import { IoLocateOutline } from "react-icons/io5";

function Hero() {
  return (
    <div className="bg-[url('/banner.jpg')] bg-cover bg-center  h-[90vh] pt-4">
      <div className=" flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
        <h1 className=" text-white xl:text-7xl lg:text-5xl sm:text-3xl text-2xl xl:leading-normal lg:leading-normal font-bold text-center">
          Find Your{" "}
          <span className="bg-green-900 text-white whitespace-pre">
            dream jobs
          </span>{" "}
          in <br /> New Castle
        </h1>
        <p className=" text-white  bg-green-900 text-2xl lg:w-1/2 text-center leading-10 my-8">
          When you're searching for a job, there are a few things you can do to
          get the most out of your search
        </p>
      </div>
      {/* <div className="flex items-center justify-around">
        <div className="flex items-center border-2 border-solid border-green-900 rounded-full h-16 lg:w-2/5 w-full py-2 relative mt-4">
          <input
            type="text"
            placeholder="Explore Jobs..."
            className="bg-transparent h-full border-none outline-none absolute px-20 xl:text-2xl text-base"
          ></input>
          <button className="bg-green-900 rounded-full text-white w-12 h-12 absolute left-2 border-none">
            <HiSearch className="text-2xl" />
          </button>
          <button className="flex items-center bg-[#f3f3f4] absolute right-2 rounded-full lg:px-4 px-2 h-[90%] xl:text-xl text-sm font-normal gap-x-2">
            <IoLocateOutline className="text-black lg:text-2xl" />
            Any Location
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Hero;
