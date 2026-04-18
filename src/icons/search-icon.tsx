import React from "react";

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const SearchIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Circle */}
      <circle cx="11" cy="11" r="8" />
      {/* Handle */}
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
};

export default SearchIcon;