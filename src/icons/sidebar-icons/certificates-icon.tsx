const CertificateIcon = ({
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
      {/* Badge */}
      <circle cx="12" cy="8" r="4" />

      {/* Ribbons */}
      <path d="M10 12l-2 8 4-2 4 2-2-8" />
    </svg>
  );
};

export default CertificateIcon;