import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import HomeBar from "./HomeBar";
import FootBar from "./FootBar";
import Hero from "./HomePage/Hero";

const Home = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  // if(!isAuthorized){
  //   return <Navigate to={'/login'}/>;
  // }

  return (
    <section className="homePage page">
      {!isAuthorized ? (
        <>
          <HomeBar />
        </>
      ) : (
        <></>
      )}
      <Hero/>
      {/* <HeroSection /> */}
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
      <FootBar/>
    </section>
  );
};

export default Home;
