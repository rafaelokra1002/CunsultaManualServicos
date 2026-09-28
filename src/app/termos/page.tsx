import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Termos de Uso | OficinaDigital",
  description:
    "As regras de uso da plataforma OficinaDigital: o que você compra, o que pode fazer com o acesso e como funciona a garantia de 30 dias.",
  alternates: { canonical: "/termos" },
};

export default function Termos() {
  return (
    <LegalLayout
      title="Termos de Uso"
      updated="28 de setembro de 2026"
      intro={
        <>
          Estas são as regras de uso da plataforma OficinaDigital, em{" "}
          <a href="https://www.manualdeservicos.store">manualdeservicos.store</a>. Ao criar uma conta ou
          usar a plataforma, você concorda com o que está escrito aqui.
        </>
      }
    >
      <section>
        <h2><span className="n">01</span>O que você está comprando</h2>
        <p>
          Você compra o <strong>direito de acesso pessoal</strong> à plataforma: consulta de manuais de
          serviço, pinagem de ECU, parâmetros técnicos, diagnóstico por código da luz de injeção, reset de
          ECM e calculadora de folga de válvulas.
        </p>
        <p>
          O pagamento é <strong>único, de R$ 67</strong>, e o acesso é <strong>vitalício</strong>: não há
          mensalidade, renovação nem cobrança recorrente. Vitalício significa enquanto a plataforma existir
          e estiver em operação.
        </p>
      </section>

      <section>
        <h2><span className="n">02</span>Garantia de 30 dias</h2>
        <p>
          Você tem <strong>30 dias corridos</strong> a partir da compra para pedir o reembolso integral, por
          qualquer motivo. Basta chamar no WhatsApp{" "}
          <a href="https://wa.me/5571999504584">(71) 99950-4584</a> informando o e-mail cadastrado.
          Devolvemos 100% do valor, sem exigir justificativa.
        </p>
        <p>
          Esse prazo é maior que os 7 dias de arrependimento garantidos pelo Código de Defesa do Consumidor,
          que também continuam valendo.
        </p>
      </section>

      <section>
        <h2><span className="n">03</span>Como você pode usar</h2>
        <ul>
          <li>O acesso é <strong>pessoal e intransferível</strong>, vinculado à sua conta.</li>
          <li>Você pode consultar o conteúdo no trabalho do dia a dia e baixar os arquivos para uso próprio na sua oficina.</li>
          <li>Você pode usar as informações técnicas nos serviços que presta aos seus clientes.</li>
        </ul>
      </section>

      <section>
        <h2><span className="n">04</span>O que não é permitido</h2>
        <ul>
          <li>Compartilhar login e senha com terceiros, ou vender, alugar e emprestar o acesso.</li>
          <li>Redistribuir, republicar ou revender os arquivos e o conteúdo da plataforma, de graça ou cobrando.</li>
          <li>Extrair o conteúdo em massa por meio de robôs, scripts ou qualquer automação.</li>
          <li>Tentar burlar o controle de acesso ou acessar áreas restritas da plataforma.</li>
        </ul>
        <p>
          Contas que compartilham acesso ou redistribuem conteúdo podem ser <strong>suspensas ou
          encerradas</strong>, sem reembolso, depois de aviso pelos canais de contato.
        </p>
      </section>

      <section>
        <h2><span className="n">05</span>Sobre o conteúdo técnico</h2>
        <p>
          O material é <strong>referência técnica</strong> reunida de manuais de serviço e documentação
          técnica das montadoras, organizada para consulta rápida na bancada.
        </p>
        <p>
          As marcas citadas — Honda, Yamaha, Suzuki, Kawasaki e demais — pertencem às respectivas
          montadoras. A plataforma <strong>não é oficial, não é autorizada nem afiliada</strong> a nenhuma
          delas, e as marcas aparecem apenas para identificar a que veículo cada informação se refere.
        </p>
      </section>

      <section>
        <h2><span className="n">06</span>Responsabilidade técnica</h2>
        <p>
          As informações são de apoio e <strong>não substituem o julgamento do profissional</strong> nem o
          manual oficial do fabricante. Serviço em motocicleta envolve risco: quem executa é responsável por
          conferir os valores, usar equipamento adequado e seguir as normas de segurança.
        </p>
        <p>
          Trabalhamos para manter os dados corretos e atualizados, mas não garantimos que estejam livres de
          erro ou que cubram toda variante de cada modelo. Encontrou divergência? Avise pelo WhatsApp que
          corrigimos.
        </p>
      </section>

      <section>
        <h2><span className="n">07</span>Disponibilidade</h2>
        <p>
          Fazemos o possível para manter a plataforma no ar, mas ela pode ficar indisponível por manutenção,
          falha técnica ou causas fora do nosso controle. Interrupções pontuais não dão direito a reembolso
          fora do prazo de garantia.
        </p>
      </section>

      <section>
        <h2><span className="n">08</span>Seus dados</h2>
        <p>
          O tratamento dos seus dados está descrito na{" "}
          <a href="/politica-de-privacidade">Política de Privacidade</a>. Para pedir a exclusão da conta,
          veja as instruções em <a href="/exclusao-de-dados">Exclusão de dados</a>.
        </p>
      </section>

      <section>
        <h2><span className="n">09</span>Mudanças e contato</h2>
        <p>
          Estes termos podem mudar; a data no topo indica a última alteração, e mudanças relevantes são
          avisadas pelos canais de contato. Dúvidas, reclamações ou pedidos:{" "}
          <a href="https://wa.me/5571999504584">WhatsApp (71) 99950-4584</a>, com atendimento humano.
        </p>
        <p>
          Aplica-se a legislação brasileira, incluindo o Código de Defesa do Consumidor.
        </p>
      </section>
    </LegalLayout>
  );
}
