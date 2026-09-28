import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Exclusão de dados | OficinaDigital",
  description:
    "Como pedir a exclusão da sua conta e dos seus dados pessoais no OficinaDigital, o que é apagado, o que é mantido por lei e em quanto tempo.",
  alternates: { canonical: "/exclusao-de-dados" },
};

export default function ExclusaoDeDados() {
  return (
    <LegalLayout
      title="Exclusão de dados"
      updated="28 de setembro de 2026"
      intro={
        <>
          Você pode pedir a exclusão da sua conta e dos seus dados pessoais a qualquer momento, sem precisar
          justificar. Esta página explica como pedir, o que é apagado e em quanto tempo.
        </>
      }
    >
      <section>
        <h2><span className="n">01</span>Como pedir</h2>
        <ol className="steps">
          <li>
            Chame no WhatsApp <a href="https://wa.me/5571999504584">(71) 99950-4584</a>.
          </li>
          <li>
            Informe o <strong>e-mail cadastrado na conta</strong> e escreva que deseja excluir seus dados.
          </li>
          <li>
            Confirmamos a identidade pelo e-mail cadastrado e executamos a exclusão.
          </li>
        </ol>
        <p style={{ marginTop: 16 }}>
          Não cobramos nada por isso e não exigimos motivo. Responder e concluir leva{" "}
          <strong>até 15 dias</strong>, conforme a Lei Geral de Proteção de Dados.
        </p>
      </section>

      <section>
        <h2><span className="n">02</span>O que é apagado</h2>
        <ul>
          <li>Seu nome, e-mail e telefone.</li>
          <li>Sua senha (que já fica armazenada apenas de forma criptografada).</li>
          <li>Seu histórico de uso da plataforma e as preferências da conta.</li>
          <li>Seu acesso à plataforma, que é encerrado.</li>
        </ul>
      </section>

      <section>
        <h2><span className="n">03</span>O que precisa ser mantido</h2>
        <p>
          Registros da transação de compra são mantidos pelo prazo que a legislação fiscal e civil exige,
          mesmo depois da exclusão da conta. É uma obrigação legal, não uma escolha nossa. Esses registros
          ficam restritos à finalidade contábil e não são usados para contato ou marketing.
        </p>
      </section>

      <section>
        <h2><span className="n">04</span>Antes de pedir, saiba que</h2>
        <div className="box">
          <span className="k">Atenção</span>
          <p>
            A exclusão <strong>encerra o acesso vitalício</strong> que você comprou, e a ação não pode ser
            desfeita. Se quiser voltar depois, será preciso comprar de novo. Se a sua intenção é só parar de
            receber contato, avise no WhatsApp — dá para manter a conta e cortar as mensagens.
          </p>
        </div>
      </section>

      <section>
        <h2><span className="n">05</span>Dados em outras plataformas</h2>
        <p>
          Nosso site usa o Meta Pixel para medir anúncios. Os dados que a Meta coleta são controlados por
          ela: para apagá-los, use as configurações de{" "}
          <a href="https://accountscenter.facebook.com/">informações da sua conta na Meta</a>. Do nosso
          lado, a exclusão remove o que está descrito acima.
        </p>
        <p>
          Mais detalhes sobre quais dados tratamos e por quê estão na{" "}
          <a href="/politica-de-privacidade">Política de Privacidade</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
