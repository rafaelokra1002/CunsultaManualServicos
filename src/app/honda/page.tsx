import type { Metadata } from "next";
import HondaLanding from "@/components/HondaLanding";

// Mesma landing da home. A rota continua viva porque links e anúncios
// podem apontar pra cá; o canonical manda o buscador pra "/".
export const metadata: Metadata = {
  title: "Injeção Honda sem scanner — ache o defeito com o multímetro | OficinaDigital",
  description:
    "Conte as piscadas, ache o pino certo e compare com a faixa do manual. 23 modelos Honda de 2009 a 2026, 536 pinos mapeados. R$ 67, acesso vitalício.",
  alternates: { canonical: "/" },
};

export default function HondaPage() {
  return <HondaLanding />;
}
