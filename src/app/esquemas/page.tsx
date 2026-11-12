import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { marcaUrl } from "@/lib/esquemas";

export const dynamic = "force-dynamic";

export default async function EsquemasPage({ searchParams }: { searchParams: { q?: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const user = session.user as { isPremium?: boolean; role?: string };
  if (!user.isPremium && user.role !== "ADMIN") {
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-line bg-surface p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-signal">Esquemas elétricos</p>
          <h1 className="mt-2 text-2xl font-bold text-white">Disponível no plano premium</h1>
          <p className="mt-3 text-sm text-muted">
            Diagramas de injeção, ABS, chassi, instrumentação e mais, com zoom e tela cheia.
          </p>
          <Link
            href="/conta-inativa"
            className="mt-6 inline-block rounded-xl bg-signal px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Liberar acesso
          </Link>
          <p className="mt-3 text-xs text-muted">Pagamento único • Acesso vitalício</p>
        </div>
      </div>
    );
  }

  const q = (searchParams.q || "").trim();

  const grupos = await prisma.moto.groupBy({
    by: ["marca"],
    where: {
      esquemas: { some: {} },
      ...(q ? { marca: { contains: q, mode: "insensitive" as const } } : {}),
    },
    _count: { _all: true },
  });

  // a mesma marca pode vir com grafias diferentes ("YAMAHA" / "Yamaha")
  const porMarca = new Map<string, { marca: string; motos: number }>();
  for (const g of grupos) {
    const chave = g.marca.trim().toLowerCase();
    const atual = porMarca.get(chave);
    if (atual) atual.motos += g._count._all;
    else porMarca.set(chave, { marca: g.marca.trim(), motos: g._count._all });
  }
  const marcas = Array.from(porMarca.values()).sort((a, b) => a.marca.localeCompare(b.marca, "pt-BR"));

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-white">Esquemas elétricos</h1>
      <p className="mt-1 text-sm text-muted">Escolha a marca para ver os modelos com diagrama.</p>

      <form className="mt-6" action="/esquemas">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar marca..."
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-white placeholder:text-muted focus:border-signal focus:outline-none"
        />
      </form>

      {marcas.length === 0 ? (
        <p className="mt-8 text-sm text-muted">{q ? `Nenhuma marca encontrada para "${q}".` : "Nenhum esquema cadastrado ainda."}</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {marcas.map((m) => (
            <Link
              key={m.marca}
              href={marcaUrl(m.marca)}
              className="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-signal"
            >
              <p className="font-semibold uppercase text-white">{m.marca}</p>
              <p className="mt-1 text-xs text-muted">{m.motos} {m.motos === 1 ? "moto" : "motos"}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
