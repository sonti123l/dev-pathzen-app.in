export const ReactLogo = ({ className = "w-8 h-8", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    {/* Center circle */}
    <circle cx="12" cy="12" r="2" fill="currentColor" />

    {/* Orbits */}
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4"
      stroke="currentColor"
      strokeWidth="1.5"
      transform="rotate(60 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4"
      stroke="currentColor"
      strokeWidth="1.5"
      transform="rotate(120 12 12)"
    />
  </svg>
);