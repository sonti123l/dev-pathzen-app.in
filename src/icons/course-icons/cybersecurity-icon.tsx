export default function CyberSecurityIcon({ size = 40, color = "#534AB7" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 4L7 9.5V18c0 7.4 5.5 13.4 13 15.5 7.5-2.1 13-8.1 13-15.5V9.5L20 4z"
        fill={color} fillOpacity="0.15"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"
      />
      <rect x="15.5" y="17" width="9" height="7" rx="1.5"
        fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.4"
      />
      <path
        d="M17.5 17v-3a2.5 2.5 0 0 1 5 0v3"
        stroke={color} strokeWidth="1.4" strokeLinecap="round"
      />
      <circle cx="20" cy="20.5" r="1.2" fill={color} />
    </svg>
  );
}