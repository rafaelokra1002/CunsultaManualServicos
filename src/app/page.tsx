import type { Metadata } from "next";
import HondaLanding from "@/components/HondaLanding";

export const metadata: Metadata = {
  title: "Injeção Honda sem scanner — ache o defeito com o multímetro | OficinaDigital",
  description:
    "Conte as piscadas, ache o pino certo e compare com a faixa do manual. 23 modelos Honda de 2009 a 2026, 536 pinos mapeados. R$ 67, acesso vitalício.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Injeção Honda · só multímetro",
    description:
      "Ache o defeito sem trocar peça no chute. 23 modelos Honda, 536 pinos, 360 parâmetros com faixa mín/máx. R$ 67 no PIX.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return <HondaLanding />;
}
