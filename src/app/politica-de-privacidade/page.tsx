import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | OficinaDigital",
  description:
    "Como o OficinaDigital coleta, usa, compartilha e protege os dados de quem usa a plataforma de manuais de serviço de motocicletas.",
  alternates: { canonical: "/politica-de-privacidade" },
};

const CSS = `
.pp{
  --bg:#0f1113;--surface:#1a1d21;--line:#31353c;--line-soft:#25282e;
  --ink:#f4f1ec;--muted:#98a0aa;--muted-2:#6b7178;--signal:#ff6a1a;
  --disp:var(--font-display),"Archivo",system-ui,sans-serif;
  --body:var(--font-body),"IBM Plex Sans",system-ui,sans-serif;
  --mono:var(--font-mono),"IBM Plex Mono",ui-monospace,monospace;
  background:var(--bg);color:var(--ink);font-family:var(--body);line-height:1.65;
  -webkit-font-smoothing:antialiased;min-height:100vh;
}
.pp *{box-sizing:border-box}
.pp .wrap{max-width:760px;margin:0 auto;padding:0 20px}
.pp a{color:var(--signal);text-decoration:none}
.pp a:hover{text-decoration:underline}
.pp nav{border-bottom:1px solid var(--line-soft);padding-block:15px;margin-bottom:8px}
.pp .nav-in{display:flex;align-items:center;justify-content:space-between;gap:12px}
.pp .logo{font-family:var(--disp);font-weight:900;font-size:1.1rem;display:flex;align-items:center;gap:9px;color:var(--ink)}
.pp .logo .mark{width:25px;height:25px;border-radius:7px;background:var(--signal);color:#1a0e05;display:grid;place-items:center;font-size:.95rem;flex:none}
.pp .logo b{color:var(--signal)}
.pp .back{font-family:var(--mono);font-size:.82rem;color:var(--muted)}
.pp header{padding-block:44px 10px}
.pp h1{font-family:var(--disp);font-weight:900;font-size:clamp(1.9rem,5.5vw,2.7rem);line-height:1.1;margin:0;letter-spacing:-.02em}
.pp .updated{font-family:var(--mono);font-size:.8rem;color:var(--muted-2);margin-top:14px}
.pp .intro{color:var(--muted);margin-top:22px;font-size:1.02rem}
.pp section{padding-block:26px;border-top:1px solid var(--line-soft);margin-top:26px}
.pp h2{font-family:var(--disp);font-weight:800;font-size:1.22rem;margin:0 0 14px;letter-spacing:-.01em}
.pp h2 .n{font-family:var(--mono);color:var(--signal);font-size:.85rem;margin-right:10px;font-weight:600}
.pp p{margin:0 0 13px;color:var(--muted)}
.pp p:last-child{margin-bottom:0}
.pp strong{color:var(--ink);font-weight:600}
.pp ul{margin:0 0 13px;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:10px}
.pp li{display:flex;gap:11px;color:var(--muted);align-items:flex-start}
.pp li::before{content:"•";color:var(--signal);font-weight:700;flex:none;line-height:1.5}
.pp .box{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:20px 22px;margin-top:6px}
.pp .box p{color:var(--muted)}
.pp .box .k{font-family:var(--mono);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--signal);display:block;margin-bottom:9px}
.pp footer{border-top:1px solid var(--line-soft);margin-top:34px;padding-block:28px 44px;color:var(--muted-2);font-size:.85rem;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between}
`;

export default function PoliticaDePrivacidade() {
  return (
    <div className="pp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <nav>
        <div className="wrap nav-in">
          <a className="logo" href="/"><span className="mark">⚙</span>Oficina<b>Digital</b></a>
          <a className="back" href="/">← Voltar ao site</a>
        </div>
      </nav>

      <div className="wrap">
        <header>
          <h1>Política de Privacidade</h1>
          <p className="updated">Última atualização: 28 de setembro de 2026</p>
          <p className="intro">
            Esta política explica quais dados o OficinaDigital coleta, por que coleta, com quem compartilha
            e o que você pode exigir a respeito deles. Vale para o site{" "}
            <a href="https://www.manualdeservicos.store">manualdeservicos.store</a> e para a plataforma de
            consulta de manuais de serviço de motocicletas.
          </p>
        </header>

        <section>
          <h2><span className="n">01</span>Quem é o responsável</h2>
          <p>
            O OficinaDigital é operado por uma empresa registrada com CNPJ, responsável pelo tratamento dos
            dados descritos aqui. Para qualquer assunto relacionado a esta política — incluindo pedidos de
            acesso ou exclusão —, fale pelo WhatsApp{" "}
            <a href="https://wa.me/5571999504584">(71) 99950-4584</a>.
          </p>
        </section>

        <section>
          <h2><span className="n">02</span>Que dados coletamos</h2>
          <p>Coletamos apenas o necessário para criar sua conta, liberar o acesso e dar suporte:</p>
          <ul>
            <li><strong>Cadastro:</strong> nome, e-mail e telefone informados por você ao criar a conta.</li>
            <li><strong>Senha:</strong> armazenada de forma criptografada (hash). Nunca guardamos a senha em texto legível, e ninguém da equipe consegue lê-la.</li>
            <li><strong>Pagamento:</strong> processado integralmente pelo gateway de pagamento. <strong>Não recebemos nem armazenamos dados de cartão ou de conta bancária.</strong> Guardamos apenas o registro de que o pagamento foi aprovado, para liberar seu acesso.</li>
            <li><strong>Uso da plataforma:</strong> dados técnicos como endereço IP, navegador, dispositivo e páginas visitadas, usados para segurança e para entender o que precisa melhorar.</li>
          </ul>
          <p>
            Não coletamos dados sensíveis (origem racial, opinião política, saúde, biometria) e não pedimos
            documentos de identidade.
          </p>
        </section>

        <section>
          <h2><span className="n">03</span>Para que usamos</h2>
          <ul>
            <li>Criar e manter sua conta, autenticar seu login e liberar o acesso que você comprou.</li>
            <li>Processar o pagamento e confirmar a liberação do acesso vitalício.</li>
            <li>Responder seu contato no WhatsApp e prestar suporte técnico.</li>
            <li>Manter a plataforma segura, prevenindo fraude e uso indevido de contas.</li>
            <li>Medir o resultado de campanhas de divulgação e melhorar o conteúdo da plataforma.</li>
          </ul>
        </section>

        <section>
          <h2><span className="n">04</span>Cookies e tecnologias de medição</h2>
          <p>
            Usamos cookies essenciais para manter você logado — sem eles a plataforma não funciona. Usamos
            também o <strong>Meta Pixel</strong>, da Meta Platforms, que registra ações como visitar uma
            página, iniciar uma compra e concluir a compra. Isso nos permite medir se nossos anúncios
            funcionam e mostrar anúncios a pessoas com perfil parecido com o seu.
          </p>
          <p>
            Você pode bloquear cookies nas configurações do seu navegador e ajustar o que a Meta usa para
            personalizar anúncios nas preferências de anúncio da sua conta no Facebook ou Instagram.
            Bloquear cookies essenciais impede o login, mas bloquear os de medição não afeta seu acesso.
          </p>
        </section>

        <section>
          <h2><span className="n">05</span>Com quem compartilhamos</h2>
          <p>
            Não vendemos seus dados e não os cedemos para terceiros usarem por conta própria. Compartilhamos
            apenas com quem é necessário para o serviço existir:
          </p>
          <ul>
            <li><strong>Gateway de pagamento:</strong> recebe os dados da transação para processar sua compra.</li>
            <li><strong>Meta Platforms:</strong> recebe os eventos do pixel descritos acima.</li>
            <li><strong>Google:</strong> os manuais em PDF ficam hospedados no Google Drive, acessados quando você baixa um arquivo.</li>
            <li><strong>Infraestrutura:</strong> os servidores e o banco de dados que mantêm a plataforma no ar.</li>
          </ul>
          <p>
            Também podemos compartilhar dados quando houver obrigação legal ou ordem judicial.
          </p>
        </section>

        <section>
          <h2><span className="n">06</span>Por quanto tempo guardamos</h2>
          <p>
            Como o acesso é vitalício, mantemos os dados da sua conta enquanto ela existir. Registros de
            pagamento são mantidos pelo prazo exigido pela legislação fiscal. Se você pedir a exclusão da
            conta, apagamos seus dados pessoais, preservando apenas o que a lei obriga a manter.
          </p>
        </section>

        <section>
          <h2><span className="n">07</span>Seus direitos</h2>
          <p>A Lei Geral de Proteção de Dados (Lei 13.709/2018) garante que você pode, a qualquer momento:</p>
          <ul>
            <li>Confirmar se tratamos dados seus e pedir acesso a eles.</li>
            <li>Corrigir dados incompletos, desatualizados ou errados.</li>
            <li>Pedir a exclusão dos seus dados pessoais.</li>
            <li>Pedir a portabilidade dos dados para outro fornecedor.</li>
            <li>Revogar o consentimento e saber com quem compartilhamos seus dados.</li>
          </ul>
          <div className="box">
            <span className="k">Como exercer</span>
            <p>
              Chame no WhatsApp <a href="https://wa.me/5571999504584">(71) 99950-4584</a> informando o e-mail
              cadastrado e o que você quer. Respondemos em até 15 dias.
            </p>
          </div>
        </section>

        <section>
          <h2><span className="n">08</span>Segurança</h2>
          <p>
            O site trafega sob HTTPS, as senhas ficam criptografadas e o acesso ao banco de dados é restrito.
            Nenhum sistema é imune a incidentes: se acontecer um vazamento que traga risco relevante a você,
            comunicaremos você e a Autoridade Nacional de Proteção de Dados, como manda a lei.
          </p>
        </section>

        <section>
          <h2><span className="n">09</span>Menores de idade</h2>
          <p>
            A plataforma é voltada a profissionais de mecânica e não se destina a menores de 18 anos. Não
            coletamos dados de crianças e adolescentes de forma intencional.
          </p>
        </section>

        <section>
          <h2><span className="n">10</span>Mudanças nesta política</h2>
          <p>
            Se esta política mudar, a data no topo é atualizada. Mudanças relevantes na forma como tratamos
            seus dados serão avisadas pelos canais de contato ou na própria plataforma.
          </p>
        </section>

        <footer>
          <span>© 2026 OficinaDigital · Manuais de serviço de motocicletas</span>
          <span>
            <a href="https://wa.me/5571999504584">WhatsApp (71) 99950-4584</a>
          </span>
        </footer>
      </div>
    </div>
  );
}
