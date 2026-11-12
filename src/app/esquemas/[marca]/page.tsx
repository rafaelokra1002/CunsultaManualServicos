import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { marcaDaUrl, marcaUrl } from "@/lib/esquemas";

export const dynamic = "force-dynamic";

export default async function MarcaPage({ params }: { params: { marca: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  const user = session.user as { isPremium?: boolean; role?: string };
  if (!user.isPremium && user.role !== "ADMIN") redirect("/esquemas");

  const marca = marcaDaUrl(params.marca);
  const existe = await prisma.moto.findFirst({
    where: { marca: { equals: marca, mode: "insensitive" }, esquemas: { some: {} } },
    select: { marca: true },
  });
  if (!existe) notFound();

  const motos = await prisma.moto.findMany({
    where: { marca: { equals: marca, mode: "insensitive" }, esquemas: { some: {} } },
    select: { id: true, modelo: true, ano: true, _count: { select: { esquemas: true } } },
    orderBy: [{ modelo: "asc" }, { ano: "asc" }],
  });

  const porModelo = new Map<string, typeof motos>();
  for (const m of motos) {
    const lista = porModelo.get(m.modelo) ?? [];
    lista.push(m);
    porModelo.set(m.modelo, lista);
  }
  const base = marcaUrl(existe.marca);

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/esquemas" className="text-sm text-muted hover:text-white">← Marcas</Link>
      <h1 className="mt-2 text-2xl font-bold uppercase text-white">{existe.marca}</h1>
      <p className="mt-1 text-sm text-muted">{porModelo.size} {porModelo.size === 1 ? "modelo" : "modelos"} com esquema</p>

      <div className="mt-6 space-y-3">
        {Array.from(porModelo.entries()).map(([modelo, lista]) => {
          const total = lista.reduce((s, m) => s + m._count.esquemas, 0);
          return (
            <div key={modelo} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold text-white">{modelo}</p>
                <p className="shrink-0 text-xs text-muted">{total} {total === 1 ? "esquema" : "esquemas"}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {lista.map((m) => (
                  <Link
                    key={m.id}
                    href={`${base}/${m.id}`}
                    className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-signal hover:text-white"
                  >
                    {m.ano === "n/d" ? "Ano n/d" : m.ano} · {m._count.esquemas}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
