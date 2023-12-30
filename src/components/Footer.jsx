import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="flex justify-center items-center mb-4 space-x-4">
        <a
          href="https://github.com/CarlosCallejaSaez"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400"
        >
          <FaGithub className="text-2xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/carlos-calleja-saez/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400"
        >
          <FaLinkedin className="text-2xl" />
        </a>
      </div>
      <p className="text-center">&copy; 2023 Carlos Calleja</p>
    </footer>
  );
};

export default Footer;
