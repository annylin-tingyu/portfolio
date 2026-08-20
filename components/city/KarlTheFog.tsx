export function KarlTheFog({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 260"
      className={className}
      role="img"
      aria-label="Karl the Fog — drifting fog cloud with a face, San Francisco's beloved mascot"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* back layer — slow drift */}
      <g className="animate-fog-drift-slow" style={{ transformOrigin: "300px 140px" }}>
        <ellipse cx="180" cy="150" rx="130" ry="42" fill="#e9ecef" opacity="0.7" />
        <ellipse cx="380" cy="130" rx="150" ry="50" fill="#e9ecef" opacity="0.7" />
        <ellipse cx="500" cy="160" rx="90" ry="34" fill="#e9ecef" opacity="0.7" />
      </g>

      {/* main fog cloud with face — faster drift */}
      <g className="animate-fog-drift" style={{ transformOrigin: "300px 130px" }}>
        {/* cloud body — cluster of blobs */}
        <g fill="#f8f9fa" stroke="#dee2e6" strokeWidth="2">
          <ellipse cx="150" cy="150" rx="70" ry="45" />
          <ellipse cx="230" cy="120" rx="80" ry="55" />
          <ellipse cx="330" cy="110" rx="90" ry="62" />
          <ellipse cx="430" cy="125" rx="80" ry="55" />
          <ellipse cx="500" cy="150" rx="60" ry="40" />
          <ellipse cx="280" cy="165" rx="100" ry="35" />
          <ellipse cx="400" cy="170" rx="90" ry="32" />
        </g>

        {/* face */}
        {/* eyes — closed, chill */}
        <path
          d="M 280 115 Q 292 108 304 115"
          stroke="#495057"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 340 115 Q 352 108 364 115"
          stroke="#495057"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* rosy cheeks */}
        <circle cx="278" cy="140" r="8" fill="#f8bbd0" opacity="0.55" />
        <circle cx="366" cy="140" r="8" fill="#f8bbd0" opacity="0.55" />
        {/* smirk */}
        <path
          d="M 300 145 Q 322 158 344 145"
          stroke="#495057"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
