import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FcWikipedia } from "react-icons/fc";
import { RiInstagramFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Jasmeet Singh</div>
      <div>
        <Link to={"https://worldwithweb.com/"} target="_blank">
        <FcWikipedia />
        </Link>
        <Link to={"https://www.linkedin.com/in/jxsmeetsingh"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://github.com/jassmunday"} target="_blank">
        <FaGithub />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;