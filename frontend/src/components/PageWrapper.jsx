import React from "react";
import mountainBackground from '../assets/mountains.png';

const PageWrapper = ({ children }) => (
  <div className="page-wrapper">
    <div className="bg-top">
      <img 
        src={mountainBackground}
        alt="Mountain background"
        className="bg-image"
      />
      <div className="bg-overlay"></div>
    </div>

    <div className="bg-bottom"></div>
    
    <div className="content-container">
      {children}
    </div>
  </div>
);

export default PageWrapper;
