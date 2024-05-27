import React, { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

const FootBar = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={!isAuthorized ? 'footerShow bg-black text-white py-8 px-6 flex justify-between items-center' : 'footerHide'} style={{ height: '120px' }}>
      <div>&copy; All Rights Reserved By Jasmeet Singh</div>
      <div className="flex space-x-4">
        <Link to={'/'} target="_blank">
          <FaFacebookF className="text-xl" />
        </Link>
        <Link to={'/'} target="_blank">
          <FaYoutube className="text-xl" />
        </Link>
        <Link to={'/'} target="_blank">
          <FaLinkedin className="text-xl" />
        </Link>
        <Link to={'/'} target="_blank">
          <RiInstagramFill className="text-xl" />
        </Link>
      </div>
    </footer>
  );
};

export default FootBar;
