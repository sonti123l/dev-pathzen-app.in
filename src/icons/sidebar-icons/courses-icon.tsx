const CoursesIcon = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    style={{ width: size, height: size, flexShrink: 0 }}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 22 8 12 14 2 8 12 2" />
    <path d="M6 11v5c0 2 2.5 4 6 4s6-2 6-4v-5" />
    <line x1="22" y1="8" x2="22" y2="14" />
    <circle cx="22" cy="15" r="1" fill={color} stroke="none" />
  </svg>
);

export default CoursesIcon;
