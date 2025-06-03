import React from "react";

function IconProject({
  className,
  strokeColor = "black",
}: {
  className?: string;
  strokeColor?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <line
        x1="9"
        y1="4"
        x2="9"
        y2="20"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <line
        x1="15"
        y1="4"
        x2="15"
        y2="20"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <rect
        x="6"
        y="7"
        width="2"
        height="3"
        rx="1"
        fill={strokeColor}
      />
      <rect
        x="12"
        y="11"
        width="2"
        height="3"
        rx="1"
        fill={strokeColor}
      />
      <rect
        x="18"
        y="7"
        width="2"
        height="3"
        rx="1"
        fill={strokeColor}
      />
    </svg>
  );
}


export default IconProject;
