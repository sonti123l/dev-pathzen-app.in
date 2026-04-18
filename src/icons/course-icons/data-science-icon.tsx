export default function DataScienceIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="15"
        stroke="#0F6E56" strokeWidth="1.5" fill="#0F6E56" fillOpacity="0.08"
      />
      <circle cx="20" cy="20" r="9"
        stroke="#0F6E56" strokeWidth="1" fill="none" strokeDasharray="3 2.5"
      />
      <circle cx="20" cy="20" r="2.5" fill="#0F6E56" />
      <line x1="20" y1="17.5" x2="14" y2="12"
        stroke="#0F6E56" strokeWidth="1.3" strokeLinecap="round"
      />
      <circle cx="14" cy="12" r="1.8" fill="#1D9E75" />
      <circle cx="26" cy="13" r="1.8" fill="#1D9E75" />
      <circle cx="13" cy="26" r="1.8" fill="#1D9E75" />
      <circle cx="27" cy="27" r="1.8" fill="#1D9E75" />
      <circle cx="20" cy="10" r="1.4" fill="#5DCAA5" />
      <circle cx="30" cy="20" r="1.4" fill="#5DCAA5" />
    </svg>
  );
}