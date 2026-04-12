const ProgressIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
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
    >
      <line x1="4" y1="20" x2="20" y2="20" />
      <rect x="6" y="10" width="3" height="6" />
      <rect x="11" y="6" width="3" height="10" />
      <rect x="16" y="3" width="3" height="13" />
    </svg>
  );
};

export default ProgressIcon;