interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: 28,
  md: 36,
  lg: 52,
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const s = sizes[size];

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer gear ring */}
      <path
        d="M32 4l3.5 6.1a24 24 0 0 1 5.6 2.3l6.8-2.1 2.1 3.6-4.6 5.2a24 24 0 0 1 3 5.1l6.6 1.8v4.2l-6.6 1.8a24 24 0 0 1-3 5.1l4.6 5.2-2.1 3.6-6.8-2.1a24 24 0 0 1-5.6 2.3L32 60l-3.5-6.1a24 24 0 0 1-5.6-2.3l-6.8 2.1-2.1-3.6 4.6-5.2a24 24 0 0 1-3-5.1L9.4 38v-4.2l6.6-1.8a24 24 0 0 1 3-5.1l-4.6-5.2 2.1-3.6 6.8 2.1a24 24 0 0 1 5.6-2.3L32 4z"
        stroke="#6c5ce7"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      {/* Inner circle */}
      <circle cx="32" cy="32" r="14" stroke="#6c5ce7" strokeWidth="2.5" fill="#6c5ce7" fillOpacity="0.1" />
      {/* Wrench icon */}
      <path
        d="M26 26.5a6.5 6.5 0 0 1 10.8-3.2l-3.3 3.3 1.4 3 3-1.4 3.3-3.3A6.5 6.5 0 0 1 38 35.7l-7.5 7.5a2.1 2.1 0 0 1-3-3l7.5-7.5A6.5 6.5 0 0 1 26 26.5z"
        fill="#6c5ce7"
        opacity="0.9"
      />
      {/* Digital dot accent */}
      <circle cx="27" cy="41" r="1.5" fill="#a78bfa" />
    </svg>
  );
}
