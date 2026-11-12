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
    include: { esquemas: { orderBy: [{ modulo: "asc" }, { id: "asc" }] } },
  });
  if (!moto) notFound();
  // id certo com marca errada na URL: manda para a URL canônica
  if (moto.marca.trim().toLowerCase() !== marcaDaUrl(params.marca).toLowerCase()) {
    redirect(`${marcaUrl(moto.marca)}/${moto.id}`);
  }

  const selecionado = moto.esquemas.find((e) => e.id === searchParams.ver) ?? moto.esquemas[0];
  const base = `${marcaUrl(moto.marca)}/${moto.id}`;
  const voltar = marcaUrl(moto.marca);

  const rotulo = (e: (typeof moto.esquemas)[number]) =>
    `${MODULO_LABEL[e.modulo]}${e.sistema?.trim() ? ` · ${e.sistema.trim()}` : ""}`;

  // tela inteira, por cima da Sidebar (z-50) e da barra móvel
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#16181c]">
      <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-[#111317] px-3 py-2 sm:px-4">
        <Link
          href={voltar}
          className="flex h-10 shrink-0 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-white hover:border-signal sm:h-9"
        >
          ← Voltar
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white sm:text-base">
            <span className="uppercase">{moto.marca}</span> {moto.modelo}
          </p>
          <p className="truncate text-xs text-muted">
            {moto.ano === "n/d" ? "Ano n/d" : moto.ano}
            {moto.ecuTipo ? ` · ECU ${moto.ecuTipo}` : ""}
            {selecionado ? ` · ${rotulo(selecionado)}` : ""}
          </p>
        </div>
        {moto.esquemas.length > 1 && (
          <nav className="flex w-full gap-2 overflow-x-auto pb-1 sm:w-auto sm:pb-0">
            {moto.esquemas.map((e) => {
              const ativo = e.id === selecionado?.id;
              return (
                <Link
                  key={e.id}
                  href={`${base}?ver=${e.id}`}
                  replace
                  scroll={false}
                  className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                    ativo ? "border-signal bg-signal/10 text-signal" : "border-line text-muted hover:border-signal hover:text-white"
                  }`}
                >
                  {rotulo(e)} · {e.formato.toUpperCase()}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <div className="min-h-0 flex-1">
        {selecionado ? (
          <EsquemaViewer
            key={selecionado.id}
            src={selecionado.arquivo}
            formato={selecionado.formato}
            titulo={`${moto.marca} ${moto.modelo} · ${rotulo(selecionado)}`}
            ocupaTela
          />
        ) : (
          <p className="p-6 text-sm text-muted">Nenhum esquema cadastrado para esta moto.</p>
        )}
      </div>
    </div>
  );
}
