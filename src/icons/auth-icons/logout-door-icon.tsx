const LogoutDoorIcon = ({ size = 32, strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Door */}
      <path d="M3 21h6" />
      <path d="M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
      
      {/* Exit Arrow */}
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
};

export default LogoutDoorIcon;