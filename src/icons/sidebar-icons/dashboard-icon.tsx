const DashboardIcon = ({ size = 20, color = "currentColor" }) => (
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
    <rect x="3" y="3" width="8" height="5" rx="1.5" />
    <rect x="13" y="3" width="8" height="9" rx="1.5" />
    <rect x="3" y="10" width="8" height="11" rx="1.5" />
    <rect x="13" y="14" width="8" height="7" rx="1.5" />
  </svg>
);

export default DashboardIcon;
