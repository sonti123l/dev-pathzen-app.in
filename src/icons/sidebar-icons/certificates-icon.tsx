const CertificationsIcon = ({ size = 20, color = "currentColor" }) => (
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
    <circle cx="12" cy="9" r="6" />
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    <polyline points="10 9 11.5 11 14.5 7" />
  </svg>
);

export default CertificationsIcon;
