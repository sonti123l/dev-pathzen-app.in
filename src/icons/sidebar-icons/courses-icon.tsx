const CoursesIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className=""
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Book */}
      <path d="M4 19a2 2 0 0 1 2-2h14" />
      <path d="M6 17V5a2 2 0 0 1 2-2h12v16H8a2 2 0 0 0-2 2z" />
      
      {/* Divider line (pages) */}
      <line x1="12" y1="3" x2="12" y2="19" />
    </svg>
  );
};

export default CoursesIcon;