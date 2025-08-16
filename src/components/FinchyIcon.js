import React from 'react';
import finchyImage from "../finchy-blank-background.png";

const FinchyIcon = ({ className = "w-6 h-6", ...props }) => {
  return (
    <img src={finchyImage} alt="Finchy" className={className} {...props} />
  );
};

export default FinchyIcon;
