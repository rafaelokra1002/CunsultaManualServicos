import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EsquemaViewer from "@/components/EsquemaViewer";
import { MODULO_LABEL, marcaDaUrl, marcaUrl } from "@/lib/esquemas";

export const dynamic = "force-dynamic";

export default async function MotoEsquemasPage({
  params,
  searchParams,
}: {
  params: { marca: string; id: string };
  searchParams: { ver?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  const user = session.user as { isPremium?: boolean; role?: string };
  if (!user.isPremium && user.role !== "ADMIN") redirect("/esquemas");

  const moto = await prisma.moto.findUnique({
    where: { id: params.id },
    include: {
      esquemas: { orderBy: [{ modulo: "asc" }, { id: "asc" }] },
      _count: { select: { pinagens: true, parametros: true } },
    },
  });
  if (!moto) notFound();
  // id certo com marca errada na URL: manda para a URL canônica
  if (moto.marca.trim().toLowerCase() !== marcaDaUrl(params.marca).toLowerCase()) {
    redirect(`${marcaUrl(moto.marca)}/${moto.id}`);
  }

  const selecionado = moto.esquemas.find((e) => e.id === searchParams.ver) ?? moto.esquemas[0];
  const base = `${marcaUrl(moto.marca)}/${moto.id}`;

  const porModulo = new Map<string, typeof moto.esquemas>();
  for (const e of moto.esquemas) {
    const lista = porModulo.get(e.modulo) ?? [];
    lista.push(e);
    porModulo.set(e.modulo, lista);
  }

  const titulo = (e: (typeof moto.esquemas)[number]) =>
    `${moto.marca} ${moto.modelo} · ${MODULO_LABEL[e.modulo]}${e.sistema?.trim() ? ` · ${e.sistema.trim()}` : ""}`;

  return (
    <div className="mx-auto max-w-7xl">
      <Link href={marcaUrl(moto.marca)} className="text-sm text-muted hover:text-white">← {moto.marca}</Link>
      <h1 className="mt-2 text-2xl font-bold text-white">
        {moto.modelo} <span className="text-base font-normal text-muted">{moto.ano === "n/d" ? "" : moto.ano}</span>
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-4">
          {selecionado ? (
            <EsquemaViewer key={selecionado.id} src={selecionado.arquivo} formato={selecionado.formato} titulo={titulo(selecionado)} />
          ) : (
            <p className="text-sm text-muted">Nenhum esquema cadastrado para esta moto.</p>
          )}

          <div className="space-y-4">
            {Array.from(porModulo.entries()).map(([modulo, lista]) => (
              <div key={modulo}>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
                  {MODULO_LABEL[modulo as keyof typeof MODULO_LABEL]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {lista.map((e) => {
                    const ativo = e.id === selecionado?.id;
                    return (
                      <Link
                        key={e.id}
                        href={`${base}?ver=${e.id}`}
                        scroll={false}
                        className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                          ativo ? "border-signal bg-signal/10 text-signal" : "border-line text-muted hover:border-signal hover:text-white"
                        }`}
                      >
                        {e.sistema?.trim() || MODULO_LABEL[e.modulo]} · {e.formato.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-line bg-surface p-4 text-sm">
          <dl className="space-y-3">
            <div><dt className="text-xs text-muted">Marca</dt><dd className="font-medium uppercase text-white">{moto.marca}</dd></div>
            <div><dt className="text-xs text-muted">Modelo</dt><dd className="font-medium text-white">{moto.modelo}</dd></div>
            <div><dt className="text-xs text-muted">Ano</dt><dd className="font-medium text-white">{moto.ano}</dd></div>
            <div><dt className="text-xs text-muted">ECU</dt><dd className="font-medium text-white">{moto.ecuTipo || "—"}</dd></div>
            <div className="flex gap-6 border-t border-line pt-3">
              <div><dt className="text-xs text-muted">Esquemas</dt><dd className="font-medium text-white">{moto.esquemas.length}</dd></div>
              <div><dt className="text-xs text-muted">Pinagens</dt><dd className="font-medium text-white">{moto._count.pinagens}</dd></div>
              <div><dt className="text-xs text-muted">Parâmetros</dt><dd className="font-medium text-white">{moto._count.parametros}</dd></div>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
