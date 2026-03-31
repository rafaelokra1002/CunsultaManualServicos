interface BrandCoverProps {
  brand: string;
  model: string;
  year: number;
  className?: string;
}

const brandThemes: Record<string, { bg: string; accent: string; text: string; icon: string }> = {
  Honda:         { bg: "from-red-900/80 to-red-950",       accent: "#e53e3e", text: "#fca5a5",  icon: "H" },
  Yamaha:        { bg: "from-blue-900/80 to-blue-950",     accent: "#3182ce", text: "#93c5fd",  icon: "Y" },
  BMW:           { bg: "from-sky-900/80 to-sky-950",       accent: "#0ea5e9", text: "#7dd3fc",  icon: "B" },
  Kawasaki:      { bg: "from-green-900/80 to-green-950",   accent: "#38a169", text: "#86efac",  icon: "K" },
  Suzuki:        { bg: "from-yellow-900/80 to-yellow-950", accent: "#d69e2e", text: "#fde68a",  icon: "S" },
  Triumph:       { bg: "from-amber-900/80 to-amber-950",   accent: "#d97706", text: "#fcd34d",  icon: "T" },
  "Royal Enfield": { bg: "from-stone-800/80 to-stone-950", accent: "#a8a29e", text: "#d6d3d1", icon: "RE" },
  Husqvarna:     { bg: "from-indigo-900/80 to-indigo-950", accent: "#6366f1", text: "#a5b4fc",  icon: "Hq" },
  Hyosung:       { bg: "from-teal-900/80 to-teal-950",     accent: "#14b8a6", text: "#5eead4",  icon: "Hy" },
  Referência:    { bg: "from-slate-800/80 to-slate-950",   accent: "#64748b", text: "#94a3b8",  icon: "⚙" },
};

const defaultTheme = { bg: "from-purple-900/80 to-purple-950", accent: "#6c5ce7", text: "#c4b5fd", icon: "M" };

export default function BrandCover({ brand, model, year, className = "" }: BrandCoverProps) {
  const theme = brandThemes[brand] || defaultTheme;

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${theme.bg} ${className}`}>
      {/* Background pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${brand}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${brand})`} />
      </svg>

      {/* Decorative circles */}
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)` }}
      />
      <div
        className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full opacity-15"
        style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-4">
        {/* Brand badge */}
        <div className="flex items-center justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black"
            style={{ backgroundColor: `${theme.accent}30`, color: theme.accent }}
          >
            {theme.icon}
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-bold"
            style={{ backgroundColor: `${theme.accent}20`, color: theme.text }}
          >
            {year}
          </span>
        </div>

        {/* Model info */}
        <div className="mt-auto">
          <p className="text-[10px] font-semibold uppercase tracking-wider opacity-60" style={{ color: theme.text }}>
            {brand}
          </p>
          <p className="mt-0.5 text-sm font-bold leading-tight text-white line-clamp-2">
            {model}
          </p>
        </div>
      </div>
    </div>
  );
}
