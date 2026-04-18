export default function DataAnalystIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="4"
        stroke="#185FA5" strokeWidth="1.5" fill="#185FA5" fillOpacity="0.07"
      />
      <rect x="9"  y="23" width="5.5" height="9"  rx="1.2" fill="#378ADD" />
      <rect x="17.5" y="17" width="5.5" height="15" rx="1.2" fill="#185FA5" />
      <rect x="26" y="11" width="5.5" height="21" rx="1.2" fill="#0C447C" />
      <polyline
        points="11.75,22 20.25,15.5 28.75,10"
        stroke="#378ADD" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <circle cx="11.75" cy="22"   r="1.6" fill="#378ADD" />
      <circle cx="20.25" cy="15.5" r="1.6" fill="#378ADD" />
      <circle cx="28.75" cy="10"   r="1.6" fill="#378ADD" />
    </svg>
  );
}