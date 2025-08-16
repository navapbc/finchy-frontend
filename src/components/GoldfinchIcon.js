import React from "react";

const GoldfinchIcon = ({ className = "w-6 h-6", ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Goldfinch bird body */}
      <path
        d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3 6l1.5 1.5L12 18l1.5-2.5L15 14c1.5-1.5 3-3.5 3-6 0-3.5-2.5-6-6-6z"
        fill="#FFD700"
        stroke="#DAA520"
        strokeWidth="0.5"
      />

      {/* Goldfinch head */}
      <circle
        cx="12"
        cy="6"
        r="2"
        fill="#FFD700"
        stroke="#DAA520"
        strokeWidth="0.5"
      />

      {/* Goldfinch beak */}
      <path d="M14 6l1.5-0.5L15.5 5.5L14 6z" fill="#FF8C00" />

      {/* Goldfinch eye */}
      <circle cx="12.5" cy="5.5" r="0.5" fill="#000" />

      {/* Goldfinch wing */}
      <path
        d="M9 10c-0.5-1-1-2-1-3s0.5-2 1-3l2 1.5L9 10z"
        fill="#FFD700"
        stroke="#DAA520"
        strokeWidth="0.5"
      />

      {/* Goldfinch tail */}
      <path
        d="M15 12l-1.5 2.5L12 16l-1.5-1.5L9 12l3-2 3 2z"
        fill="#FFD700"
        stroke="#DAA520"
        strokeWidth="0.5"
      />

      {/* Goldfinch feet */}
      <path d="M11 18l-0.5 1h3l-0.5-1h-2z" fill="#8B4513" />
    </svg>
  );
};

export default GoldfinchIcon;
