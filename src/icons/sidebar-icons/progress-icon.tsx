const ProgressIcon = ({ size = 20, color = "currentColor" }) => (
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
    <rect x="2" y="14" width="4" height="8" rx="1" />
    <rect x="9" y="9" width="4" height="13" rx="1" />
    <rect x="16" y="4" width="4" height="18" rx="1" />
    <polyline points="3 7 8 4 14 6 20 2" />
    <polyline points="17 2 20 2 20 5" />
  </svg>
);

export default ProgressIcon;