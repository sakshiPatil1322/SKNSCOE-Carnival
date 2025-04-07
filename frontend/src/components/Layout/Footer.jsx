import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full h-[2cm] bg-white bg-opacity-60 border rounded-2xl shadow-md border-transparent bg-clip-padding backdrop-blur-md px-4 mt-5 flex flex-col justify-center items-center"
      style={{
        borderImage: 'linear-gradient(to right, #4285F4, #34A853, #FBBC05, #EA4335) 1',
      }}
    >
      <p className="text-sm md:text-base text-gray-700 text-center mb-1">
        &copy; 2025 <span className="font-semibold text-gray-800">Event Registration</span>. All Rights Reserved.
      </p>

      <div className="text-sm flex gap-2">
        <Link
          to="/about"
          className="text-[#4285F4] hover:text-[#0b66c3] no-underline transition-colors duration-200 font-medium"
          style={{ textDecoration: 'none' }}
        >
          About
        </Link>
        |
        <Link
          to="/contact"
          className="text-[#EA4335] hover:text-[#c5221f] no-underline transition-colors duration-200 font-medium"
          style={{ textDecoration: 'none' }}
        >
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
