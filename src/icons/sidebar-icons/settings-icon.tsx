const SettingsIcon = ({ size = 20, color = "currentColor" }) => (
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
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="8" cy="6" r="2.5" />
    <circle cx="16" cy="12" r="2.5" />
    <circle cx="10" cy="18" r="2.5" />
  </svg>
);

export default SettingsIcon;
