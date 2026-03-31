import BrandCover from "@/components/BrandCover";

interface ManualCardProps {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  fileUrl: string;
  coverUrl?: string | null;
}

export default function ManualCard({
  title,
  brand,
  model,
  year,
  fileUrl,
  coverUrl,
}: ManualCardProps) {
  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-[380px] flex-col overflow-hidden rounded-2xl bg-[#111118] ring-1 ring-white/[0.06] transition-all duration-300 hover:ring-[#6c5ce7]/40 hover:shadow-xl hover:shadow-[#6c5ce7]/10 hover:-translate-y-1"
    >
      {/* Imagem / Capa */}
      <div className="relative flex-1 overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <BrandCover brand={brand} model={model} year={year} className="h-full w-full" />
        )}

        {/* Gradient overlay bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111118] via-[#111118]/80 to-transparent" />

        {/* Badge da marca */}
        <div className="absolute left-4 top-4 rounded-full bg-[#6c5ce7] px-3 py-1 text-[11px] font-bold text-white shadow-lg">
          {brand}
        </div>

        {/* Ano badge */}
        <div className="absolute right-4 top-4 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white/80 backdrop-blur-sm">
          {year}
        </div>

        {/* Download icon overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
          <div className="flex h-14 w-14 scale-0 items-center justify-center rounded-full bg-[#6c5ce7] text-xl shadow-xl transition-transform duration-300 group-hover:scale-100">
            ⬇️
          </div>
        </div>
      </div>

      {/* Info - Bottom section */}
      <div className="relative z-10 -mt-8 px-5 pb-5">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#6c5ce7]">
          {model}
        </p>
        <h3 className="text-lg font-bold leading-tight text-white line-clamp-2">
          {title}
        </h3>
      </div>
    </a>
  );
}
