import React from "react";
import mountainBackground from '../assets/mountains.png';

const PageWrapper = ({ children }) => (
  <div className="font-['Montserrat'] relative min-h-screen">
    <div className="absolute top-0 left-0 w-full h-1/2">
      <img 
        src={mountainBackground}
        alt="Mountain background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
    
    <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </div>
);

export default PageWrapper;
