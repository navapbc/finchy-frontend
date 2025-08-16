import React from 'react';

const FinchyIcon = ({ className = "w-6 h-6", ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Electronic Cables Coil */}
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Main coil circle */}
        <circle cx="12" cy="16" r="4" strokeWidth="2" />
        
        {/* Cable connectors extending from the coil */}
        {/* Top Right - Ethernet RJ45 */}
        <path d="M16 12 L18 10 M16 12 L14 10" strokeWidth="1.5" />
        
        {/* Top Left - USB-B */}
        <path d="M8 12 L6 10 M8 12 L10 10" strokeWidth="1.5" />
        
        {/* Bottom Left - 3.5mm Audio Jack */}
        <path d="M8 20 L6 22 M8 20 L10 22" strokeWidth="1.5" />
        
        {/* Bottom Center-Right - USB-A */}
        <path d="M14 20 L16 22 M14 20 L12 22" strokeWidth="1.5" />
        
        {/* Bottom Right - Mini/Micro USB */}
        <path d="M18 18 L20 20 M18 18 L16 20" strokeWidth="1.5" />
      </g>

      {/* The Bird - Finchy */}
      <g fill="currentColor">
        {/* Bird's body (white with black outline) */}
        <circle cx="12" cy="8" r="2.5" fill="white" stroke="currentColor" strokeWidth="1" />
        
        {/* Bird's head */}
        <circle cx="12" cy="6" r="1.8" />
        
        {/* Bird's wing */}
        <path d="M9 7 Q8 8 9 9 Q10 8 9 7" />
        
        {/* Bird's tail */}
        <path d="M15 8 Q16 7 15 6 Q14 7 15 8" />
        
        {/* Bird's eye */}
        <circle cx="12.5" cy="5.5" r="0.4" fill="currentColor" />
        
        {/* Bird's beak */}
        <path d="M12 4.5 L13 4 L12 3.5 Z" />
        
        {/* Bird's feet gripping the cables */}
        <path d="M11.5 9.5 L11 10.5 M12.5 9.5 L13 10.5" stroke="currentColor" strokeWidth="0.8" />
      </g>
    </svg>
  );
};

export default FinchyIcon;
