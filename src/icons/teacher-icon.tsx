const TeacherIcon = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <circle cx="12" cy="7" r="4" />

      {/* Body */}
      <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />

      {/* Board */}
      <rect x="2" y="3" width="6" height="4" rx="1" />

      {/* Pointer */}
      <line x1="14" y1="14" x2="20" y2="10" />
    </svg>
  );
};

export default TeacherIcon;