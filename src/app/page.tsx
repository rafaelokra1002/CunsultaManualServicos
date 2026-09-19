const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=IBM+Plex+Mono:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
.od{
  --bg:#16181c;--bg-2:#111317;--surface:#1e2127;--surface-2:#262a31;
  --line:#33373f;--line-soft:#2a2e35;--ink:#f3f0ea;--muted:#9aa1ac;--muted-2:#6c727c;
  --signal:#ff6a1a;--signal-2:#ff8c3f;--signal-dim:rgba(255,106,26,.12);
  --ok:#37c07a;--ok-dim:rgba(55,192,122,.12);--warn:#e5484d;--warn-dim:rgba(229,72,77,.12);
  --r:14px;--maxw:1060px;
  --disp:"Archivo",system-ui,sans-serif;--body:"IBM Plex Sans",system-ui,sans-serif;--mono:"IBM Plex Mono",ui-monospace,monospace;
  background:var(--bg);color:var(--ink);font-family:var(--body);line-height:1.55;-webkit-font-smoothing:antialiased;overflow-x:hidden;
}
.od *{box-sizing:border-box}
.od .wrap{max-width:var(--maxw);margin:0 auto;padding-inline:20px}
.od section{padding-block:clamp(48px,8vw,88px)}
.od h1,.od h2,.od h3{font-family:var(--disp);margin:0;line-height:1.04;text-wrap:balance;letter-spacing:-.01em}
.od h1{font-weight:900;font-size:clamp(2.1rem,7.2vw,3.7rem)}
.od h2{font-weight:800;font-size:clamp(1.7rem,5vw,2.6rem)}
.od p{margin:0}
.od a{color:inherit;text-decoration:none}
.od .mono{font-family:var(--mono)}
.od .eyebrow{font-family:var(--mono);font-size:.72rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--signal);display:inline-flex;align-items:center;gap:9px}
.od .eyebrow::before{content:"";width:22px;height:2px;background:var(--signal)}
.od .lead{color:var(--muted);font-size:clamp(1.02rem,2.4vw,1.18rem);max-width:56ch}
.od .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:var(--disp);font-weight:800;font-size:1.02rem;letter-spacing:.01em;padding:16px 26px;border-radius:12px;border:0;cursor:pointer;background:linear-gradient(180deg,var(--signal-2),var(--signal));color:#1a0e05;box-shadow:0 8px 24px -8px rgba(255,106,26,.6);transition:transform .12s ease,box-shadow .12s ease;text-align:center}
.od .btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px -8px rgba(255,106,26,.7)}
.od .btn:focus-visible{outline:3px solid var(--signal-2);outline-offset:3px}
.od .btn .pill{font-family:var(--mono);font-weight:700;background:rgba(26,14,5,.16);padding:2px 8px;border-radius:6px;font-size:.9rem}
.od .btn-ghost{background:transparent;color:var(--ink);border:1px solid var(--line);box-shadow:none;font-size:.9rem;padding:11px 18px}
.od .btn-ghost:hover{border-color:var(--signal);transform:none;box-shadow:none}
.od .cta-sub{font-family:var(--mono);font-size:.82rem;color:var(--muted);letter-spacing:.02em}
.od .topbar{background:linear-gradient(90deg,var(--surface),var(--surface-2),var(--surface));border-bottom:1px solid var(--line);font-family:var(--mono);font-size:.76rem;letter-spacing:.04em;color:var(--muted);text-align:center;padding:9px 16px}
.od .topbar b{color:var(--ink);font-weight:600}
.od .topbar .dot{color:var(--signal)}
.od nav{position:sticky;top:0;z-index:40;background:rgba(22,24,28,.82);backdrop-filter:blur(12px);border-bottom:1px solid var(--line-soft)}
.od .nav-in{display:flex;align-items:center;justify-content:space-between;padding-block:13px}
.od .logo{font-family:var(--disp);font-weight:900;font-size:1.18rem;letter-spacing:-.02em;display:flex;align-items:center;gap:9px}
.od .logo .mark{width:26px;height:26px;border-radius:7px;background:var(--signal);color:#1a0e05;display:grid;place-items:center;font-size:1rem;box-shadow:0 0 0 1px rgba(255,138,63,.5) inset}
.od .logo b{color:var(--signal)}
.od .hero{padding-top:clamp(40px,7vw,68px)}
.od .hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(30px,4vw,56px);align-items:center}
.od .badge{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:.78rem;color:var(--ink);background:var(--surface);border:1px solid var(--line);padding:7px 13px;border-radius:999px;letter-spacing:.02em}
.od .badge .g{width:7px;height:7px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 4px var(--ok-dim)}
.od .hero h1{margin-top:20px}
.od .hero h1 .s{color:var(--signal)}
.od .hero h1 .u{color:var(--ink);white-space:nowrap}
.od .hero .lead{margin-top:20px}
.od .hero-cta{margin-top:30px;display:flex;flex-direction:column;gap:12px;align-items:flex-start}
.od .trustline{display:flex;flex-wrap:wrap;gap:6px 16px;font-family:var(--mono);font-size:.78rem;color:var(--muted)}
.od .trustline span{display:inline-flex;align-items:center;gap:6px}
.od .trustline .k{color:var(--signal)}
.od .readout{background:radial-gradient(120% 80% at 80% 0,rgba(255,106,26,.10),transparent 60%),var(--bg-2);border:1px solid var(--line);border-radius:18px;padding:20px;box-shadow:0 30px 60px -30px #000,0 0 0 1px rgba(255,255,255,.02) inset;font-family:var(--mono);position:relative;overflow:hidden}
.od .readout::before{content:"";position:absolute;inset:0;background-image:linear-gradient(var(--line-soft) 1px,transparent 1px);background-size:100% 34px;opacity:.35;pointer-events:none}
.od .rd-head{display:flex;align-items:center;justify-content:space-between;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted-2);border-bottom:1px solid var(--line);padding-bottom:12px;margin-bottom:14px;position:relative}
.od .rd-head .live{display:inline-flex;align-items:center;gap:7px;color:var(--warn)}
.od .rd-head .live i{width:8px;height:8px;border-radius:50%;background:var(--warn);box-shadow:0 0 8px var(--warn);animation:odblink 1.1s steps(1) infinite}
@keyframes odblink{50%{opacity:.15;box-shadow:none}}
.od .rd-row{display:flex;justify-content:space-between;gap:14px;font-size:.9rem;padding:7px 0;position:relative}
.od .rd-row .l{color:var(--muted)}
.od .rd-row .v{color:var(--ink);font-weight:600}
.od .rd-div{height:1px;background:var(--line);margin:12px 0;position:relative}
.od .rd-result{position:relative;background:var(--signal-dim);border:1px solid rgba(255,106,26,.3);border-radius:10px;padding:14px 15px;margin-top:6px}
.od .rd-result .tag{font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--signal)}
.od .rd-result .big{font-family:var(--disp);font-weight:800;font-size:1.15rem;color:var(--ink);margin-top:6px;line-height:1.15}
.od .rd-result .fix{color:var(--signal-2);font-size:.92rem;margin-top:6px}
.od .rd-foot{display:flex;justify-content:space-between;font-size:.74rem;color:var(--muted-2);margin-top:14px;position:relative}
.od .head{max-width:60ch}
.od .head h2{margin-top:16px}
.od .head .lead{margin-top:14px}
.od .center{text-align:center;margin-inline:auto}
.od .center .eyebrow{justify-content:center}
.od .grid{display:grid;gap:16px;margin-top:36px}
.od .g3{grid-template-columns:repeat(3,1fr)}
.od .g4{grid-template-columns:repeat(4,1fr)}
.od .card{background:var(--surface);border:1px solid var(--line-soft);border-radius:var(--r);padding:22px}
.od .card h3{font-size:1.06rem;margin-top:12px;letter-spacing:0}
.od .card p{color:var(--muted);font-size:.92rem;margin-top:8px}
.od .card.solve{border-color:var(--line);background:linear-gradient(180deg,var(--surface),var(--bg-2))}
.od .card.solve .k{font-family:var(--mono);color:var(--signal);font-size:.8rem;letter-spacing:.08em}
.od .trust .card{position:relative;padding-left:22px}
.od .trust .tick{color:var(--ok);font-family:var(--mono);font-weight:700;font-size:.85rem}
.od .pain{display:flex;flex-direction:column;gap:10px;max-width:640px;margin:34px auto 0}
.od .pain li{list-style:none;display:flex;gap:13px;align-items:flex-start;background:var(--warn-dim);border:1px solid rgba(229,72,77,.22);border-radius:11px;padding:14px 16px;color:#f4cccd;font-size:.95rem}
.od .pain .x{color:var(--warn);font-family:var(--mono);font-weight:700;flex:none}
.od .reframe{max-width:560px;margin:30px auto 0;text-align:center;border:1px solid rgba(255,106,26,.3);background:var(--signal-dim);border-radius:16px;padding:26px}
.od .reframe p{font-family:var(--disp);font-weight:800;font-size:clamp(1.15rem,3.4vw,1.5rem);line-height:1.25;color:var(--ink)}
.od .reframe .a{color:var(--signal)}
.od .step{background:var(--surface);border:1px solid var(--line-soft);border-radius:var(--r);padding:20px;position:relative}
.od .step .n{font-family:var(--mono);font-weight:700;color:var(--signal);font-size:.85rem;letter-spacing:.1em}
.od .step p{margin-top:12px;font-size:.92rem;color:var(--ink)}
.od .step p .code{color:var(--signal-2)}
.od .chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:26px}
.od .chip{font-family:var(--mono);font-size:.8rem;color:var(--ok);background:var(--ok-dim);border:1px solid rgba(55,192,122,.25);border-radius:999px;padding:8px 15px}
.od .quote{background:var(--surface);border:1px solid var(--line-soft);border-radius:var(--r);padding:22px;display:flex;flex-direction:column;gap:14px}
.od .quote .stars{color:var(--signal);letter-spacing:2px;font-size:.85rem}
.od .quote .t{color:var(--ink);font-size:.98rem;line-height:1.5}
.od .quote .who{display:flex;align-items:center;gap:12px;border-top:1px solid var(--line-soft);padding-top:14px}
.od .quote .av{width:40px;height:40px;border-radius:10px;background:var(--surface-2);border:1px solid var(--line);display:grid;place-items:center;font-family:var(--disp);font-weight:800;color:var(--signal)}
.od .quote .who b{font-size:.92rem}
.od .quote .who span{display:block;font-family:var(--mono);font-size:.72rem;color:var(--muted-2);margin-top:2px}
.od .offer{max-width:560px;margin:36px auto 0;background:var(--bg-2);border:1px solid var(--line);border-radius:18px;padding:clamp(22px,4vw,32px);box-shadow:0 30px 60px -30px #000}
.od .offer .li{display:flex;justify-content:space-between;align-items:baseline;gap:14px;padding:10px 0;border-bottom:1px dashed var(--line-soft)}
.od .offer .li .name{font-size:.93rem;color:var(--ink);display:flex;gap:10px}
.od .offer .li .name .c{color:var(--ok);font-family:var(--mono)}
.od .offer .li .name.bonus .c{color:var(--signal)}
.od .offer .li .price{font-family:var(--mono);color:var(--muted-2);text-decoration:line-through;font-size:.88rem;font-variant-numeric:tabular-nums}
.od .offer .total{display:flex;justify-content:space-between;align-items:baseline;margin-top:16px}
.od .offer .total .l{font-family:var(--mono);font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.od .offer .total .v{font-family:var(--mono);color:var(--muted-2);text-decoration:line-through;font-size:1.05rem}
.od .offer .price-now{text-align:center;margin-top:18px}
.od .offer .price-now .lbl{font-family:var(--mono);font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.od .offer .price-now .big{font-family:var(--disp);font-weight:900;font-size:clamp(3.4rem,13vw,4.6rem);color:var(--ok);line-height:1;margin-top:6px;letter-spacing:-.02em}
.od .offer .price-now .big small{font-size:.4em;color:var(--muted);font-weight:600;vertical-align:top;margin-right:2px}
.od .offer .price-now .meta{font-family:var(--mono);font-size:.78rem;color:var(--muted);margin-top:10px}
.od .offer .btn{width:100%;margin-top:22px}
.od .guarantee{max-width:600px;margin-inline:auto;text-align:center;border:1px solid rgba(55,192,122,.35);background:var(--ok-dim);border-radius:18px;padding:clamp(28px,5vw,40px)}
.od .guarantee .shield{font-size:2.6rem}
.od .guarantee h2{margin-top:12px;font-size:clamp(1.4rem,4vw,2rem)}
.od .guarantee p{color:var(--muted);margin-top:14px;max-width:48ch;margin-inline:auto}
.od .guarantee .stamp{display:inline-block;margin-top:18px;font-family:var(--mono);font-weight:600;font-size:.86rem;color:var(--ok);background:rgba(55,192,122,.15);border:1px solid rgba(55,192,122,.3);border-radius:10px;padding:10px 16px}
.od .faq{max-width:720px;margin:32px auto 0;display:flex;flex-direction:column;gap:10px}
.od details{background:var(--surface);border:1px solid var(--line-soft);border-radius:12px;overflow:hidden}
.od details[open]{border-color:var(--line)}
.od summary{list-style:none;cursor:pointer;padding:17px 20px;display:flex;justify-content:space-between;gap:14px;align-items:center;font-weight:600;font-size:.98rem}
.od summary::-webkit-details-marker{display:none}
.od summary .plus{font-family:var(--mono);color:var(--signal);font-size:1.3rem;flex:none;transition:transform .2s}
.od details[open] summary .plus{transform:rotate(45deg)}
.od details .a{padding:0 20px 18px;color:var(--muted);font-size:.93rem;line-height:1.6;max-width:64ch}
.od .final{border:1px solid rgba(255,106,26,.3);background:radial-gradient(120% 90% at 50% 0,rgba(255,106,26,.12),transparent 60%),var(--bg-2);border-radius:20px;padding:clamp(30px,6vw,56px);text-align:center;max-width:720px;margin-inline:auto}
.od .final .eyebrow{justify-content:center}
.od .final h2{margin-top:16px}
.od .final p{color:var(--muted);margin-top:14px;max-width:46ch;margin-inline:auto}
.od .final .btn{margin-top:26px}
.od .final .cta-sub{display:block;margin-top:14px}
.od footer{border-top:1px solid var(--line-soft);padding-block:32px;margin-top:20px}
.od footer .fx{display:flex;flex-wrap:wrap;gap:14px 26px;align-items:center;justify-content:space-between;font-size:.84rem;color:var(--muted-2)}
.od footer a{color:var(--muted)}
.od footer a:hover{color:var(--signal)}
.od footer .links{display:flex;gap:20px;font-family:var(--mono);font-size:.8rem}
.od .buybar{display:none}
@media(max-width:860px){
  .od .hero-grid{grid-template-columns:1fr;gap:34px}
  .od .readout{order:2}
  .od .g3{grid-template-columns:1fr 1fr}
  .od .g4{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){
  .od .g3,.od .g4{grid-template-columns:1fr}
  .od .hero-cta{align-items:stretch}
  .od .hero-cta .btn{width:100%}
  .od{padding-bottom:78px}
  .od .buybar{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:50;align-items:center;justify-content:space-between;gap:12px;background:rgba(17,19,23,.94);backdrop-filter:blur(12px);border-top:1px solid var(--line);padding:12px 16px;padding-bottom:calc(12px + env(safe-area-inset-bottom,0px))}
  .od .buybar .p{font-family:var(--disp);font-weight:900;font-size:1.25rem;color:var(--ok);line-height:1}
  .od .buybar .p small{display:block;font-family:var(--mono);font-size:.62rem;color:var(--muted);font-weight:500;letter-spacing:.06em}
  .od .buybar .btn{padding:14px 20px;font-size:.95rem;flex:1;max-width:62%}
}
@media(prefers-reduced-motion:reduce){.od *{animation:none!important;transition:none!important}}
`;

export default function Home() {
  return (
    <div className="od">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="topbar">
        <span className="dot">●</span> Pagamento único de <b>R$ 67</b> · Acesso vitalício, sem mensalidade · Garantia de 30 dias
      </div>

      <nav>
        <div className="wrap nav-in">
          <span className="logo"><span className="mark">⚙</span>Oficina<b>Digital</b></span>
          <a className="btn-ghost" href="/login">Já tenho conta</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="badge"><span className="g"></span>+300 mecânicos usando no Brasil</span>
              <h1>Descubra <span className="s">qualquer defeito</span> de moto em <span className="u">5 minutos</span> — sem chutar peça, sem scanner caro</h1>
              <p className="lead">+2.300 manuais oficiais, diagnóstico Honda sem scanner e calculadora de válvulas. Tudo no seu celular, funcionando até offline na oficina.</p>
              <div className="hero-cta">
                <a className="btn" href="/register">Quero acessar agora <span className="pill">R$ 67 no PIX</span></a>
                <div className="trustline">
                  <span><span className="k">◆</span> Pagamento seguro</span>
                  <span><span className="k">◆</span> 4.9/5 · 87 avaliações</span>
                  <span><span className="k">◆</span> PIX · liberação imediata</span>
                </div>
              </div>
            </div>

            <div className="readout" aria-label="Exemplo de diagnóstico">
              <div className="rd-head"><span>Diagnóstico · Honda</span><span className="live"><i></i>ao vivo</span></div>
              <div className="rd-row"><span className="l">MODELO</span><span className="v">Biz 110i</span></div>
              <div className="rd-row"><span className="l">SINTOMA</span><span className="v">painel piscando</span></div>
              <div className="rd-row"><span className="l">CÓDIGO</span><span className="v">8 piscadas</span></div>
              <div className="rd-div"></div>
              <div className="rd-result">
                <div className="tag">Resultado</div>
                <div className="big">Falha no sensor TPS</div>
                <div className="fix">→ teste os pinos 1 e 3</div>
              </div>
              <div className="rd-foot"><span>tempo: ~4 min</span><span>fonte: manual oficial</span></div>
            </div>
          </div>
        </section>

        <section className="trust">
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">Antes de tudo</span>
              <h2>&ldquo;Isso é golpe?&rdquo; Entendemos a desconfiança.</h2>
              <p className="lead center">Você já perdeu dinheiro com promessa que não entrega. Veja por que aqui é diferente:</p>
            </div>
            <div className="grid g3">
              <div className="card"><div className="tick">✓ GARANTIA</div><h3>30 dias, risco zero</h3><p>Não funcionou pra você? Devolvemos 100% do valor. Sem perguntas, sem burocracia.</p></div>
              <div className="card"><div className="tick">✓ EMPRESA REAL</div><h3>CNPJ e atendimento humano</h3><p>Empresa registrada, com gente de verdade respondendo. Fale com a gente antes de comprar.</p></div>
              <div className="card"><div className="tick">✓ COMUNIDADE</div><h3>+300 mecânicos ativos</h3><p>Converse com outros mecânicos no grupo do WhatsApp antes de decidir.</p></div>
              <div className="card"><div className="tick">✓ SUPORTE</div><h3>Resposta em 10 minutos</h3><p>WhatsApp (71) 99950-4584. Atendimento humano, não é robô.</p></div>
              <div className="card"><div className="tick">✓ PAGAMENTO</div><h3>Gateway oficial</h3><p>Processado por gateway seguro. Seus dados bancários nunca chegam até nós.</p></div>
              <div className="card"><div className="tick">✓ SEM PEGADINHA</div><h3>Paga uma vez, é seu</h3><p>Nada de mensalidade escondida. Um pagamento de R$ 67 e acesso vitalício.</p></div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">O problema</span>
              <h2>Cansado de perder tempo e dinheiro chutando peça?</h2>
            </div>
            <ul className="pain">
              <li><span className="x">✕</span> Cliente traz moto piscando um código que você nunca viu</li>
              <li><span className="x">✕</span> 30 minutos procurando manual no Google que não existe</li>
              <li><span className="x">✕</span> Troca TPS, sensor, módulo — e o problema continua</li>
              <li><span className="x">✕</span> Cliente começa a desconfiar da sua técnica</li>
              <li><span className="x">✕</span> Perde o cliente pra concorrência porque demorou demais</li>
            </ul>
            <div className="reframe"><p>Não é falta de competência.<br />É falta de <span className="a">informação na mão certa</span>.</p></div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">A solução</span>
              <h2>Sua oficina inteira dentro do celular</h2>
              <p className="lead center">Cinco ferramentas que resolvem o dia a dia do mecânico — sem equipamento caro.</p>
            </div>
            <div className="grid g3">
              <div className="card solve"><div className="k">01 · ACERVO</div><h3>+2.300 manuais oficiais</h3><p>16 montadoras: Honda, Yamaha, Suzuki, Kawasaki, KTM, Harley, Triumph, BMW, Ducati e mais. Busca por modelo em segundos.</p></div>
              <div className="card solve"><div className="k">02 · DIAGNÓSTICO</div><h3>Honda sem scanner</h3><p>Decifre as piscadas do painel em segundos. Sem equipamento caro, sem esperar laudo externo.</p></div>
              <div className="card solve"><div className="k">03 · CÁLCULO</div><h3>Calculadora de válvulas</h3><p>Esqueça a anotação na parede. Folga de válvula, tabela de óleo e suspensão direto no celular.</p></div>
              <div className="card solve"><div className="k">04 · ELÉTRICA</div><h3>ECU &amp; Pinagem</h3><p>Esquemas de pinagem e ECU pra achar o pino certo na hora do teste.</p></div>
              <div className="card solve"><div className="k">05 · TABELAS</div><h3>Óleo &amp; Suspensão</h3><p>Especificações de óleo e regulagem de suspensão por modelo, sempre à mão.</p></div>
              <div className="card solve" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", background: "var(--signal-dim)", borderColor: "rgba(255,106,26,.3)" }}>
                <div className="k">TUDO ISSO POR</div><h3 style={{ fontSize: "2.2rem", color: "var(--ok)" }}>R$ 67</h3><p style={{ color: "var(--ink)" }}>Pagamento único. Sem mensalidade.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">Na prática</span>
              <h2>Como funciona na oficina</h2>
              <p className="lead center mono" style={{ color: "var(--muted)" }}>Caso real: Honda Biz 110i com 8 piscadas no painel</p>
            </div>
            <div className="grid g4 steps">
              <div className="step"><div className="n">PASSO 01</div><p>Abre o app e vai em &ldquo;Diagnóstico Honda&rdquo;.</p></div>
              <div className="step"><div className="n">PASSO 02</div><p>Escolhe &ldquo;Biz 110i&rdquo; e &ldquo;8 piscadas&rdquo;.</p></div>
              <div className="step"><div className="n">PASSO 03</div><p>O app mostra: <span className="code">Falha sensor TPS — teste pinos 1 e 3</span>.</p></div>
              <div className="step"><div className="n">PASSO 04</div><p>Você conserta, cobra o serviço e ganha o cliente.</p></div>
            </div>
            <div className="chips">
              <span className="chip">⏱ 4 minutos</span>
              <span className="chip">✓ sem peça à toa</span>
              <span className="chip">✓ cliente impressionado</span>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">Prova real</span>
              <h2>O que os mecânicos dizem</h2>
            </div>
            <div className="grid g3">
              <div className="quote"><div className="stars">★★★★★</div><p className="t">&ldquo;Resolvi uma CG 160 em 20 min usando o código do painel. Cliente nunca mais foi embora.&rdquo;</p><div className="who"><span className="av">C</span><div><b>Carlos Silva</b><span>Oficina Moto Center · São Paulo/SP</span></div></div></div>
              <div className="quote"><div className="stars">★★★★★</div><p className="t">&ldquo;Triplicou minha taxa de fechamento. O cliente vê o diagnóstico técnico na hora e fecha o serviço.&rdquo;</p><div className="who"><span className="av">A</span><div><b>André Oliveira</b><span>AO Motos · Belo Horizonte/MG</span></div></div></div>
              <div className="quote"><div className="stars">★★★★★</div><p className="t">&ldquo;Se pagou no primeiro atendimento. Uso todo dia. Vale muito mais que R$ 67.&rdquo;</p><div className="who"><span className="av">J</span><div><b>João Pereira</b><span>JP Motos · Goiânia/GO</span></div></div></div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">A oferta</span>
              <h2>Tudo o que você leva hoje</h2>
            </div>
            <div className="offer">
              <div className="li"><span className="name"><span className="c">✓</span> +2.300 manuais oficiais</span><span className="price">R$ 497</span></div>
              <div className="li"><span className="name"><span className="c">✓</span> Diagnóstico Honda sem scanner</span><span className="price">R$ 197</span></div>
              <div className="li"><span className="name"><span className="c">✓</span> Calculadora de válvulas</span><span className="price">R$ 97</span></div>
              <div className="li"><span className="name"><span className="c">✓</span> ECU &amp; Pinagem</span><span className="price">R$ 147</span></div>
              <div className="li"><span className="name"><span className="c">✓</span> Óleo &amp; Suspensão (tabelas)</span><span className="price">R$ 67</span></div>
              <div className="li"><span className="name bonus"><span className="c">★</span> Bônus: Grupo VIP no WhatsApp</span><span className="price">R$ 97</span></div>
              <div className="li"><span className="name bonus"><span className="c">★</span> Bônus: Atualizações vitalícias</span><span className="price">R$ 197</span></div>
              <div className="li"><span className="name bonus"><span className="c">★</span> Bônus: Suporte direto</span><span className="price">R$ 97</span></div>
              <div className="total"><span className="l">Valor total</span><span className="v">R$ 1.396</span></div>
              <div className="price-now">
                <div className="lbl">Hoje você leva por</div>
                <div className="big"><small>R$</small>67</div>
                <div className="meta">Pagamento único via PIX · Liberação imediata · Sem mensalidade</div>
              </div>
              <a className="btn" href="/register">Quero acessar agora <span className="pill">R$ 67</span></a>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="guarantee">
              <div className="shield">🛡️</div>
              <h2>Garantia incondicional de 30 dias</h2>
              <p>Use a plataforma por 30 dias. Se não economizar pelo menos 2 horas por dia na sua oficina, devolvemos 100% do seu dinheiro. Sem perguntas. O risco é todo nosso.</p>
              <span className="stamp">R$ 67 · 30 dias de garantia · ou seu dinheiro de volta</span>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center"><span className="eyebrow">Dúvidas</span><h2>Perguntas frequentes</h2></div>
            <div className="faq">
              <details open><summary><span className="q">É confiável? Como sei que não é golpe?</span><span className="plus">+</span></summary><div className="a">Somos empresa com +300 clientes ativos, pagamento via gateway oficial e 30 dias de garantia. Se não gostar, devolvemos 100%, sem perguntas. Fale conosco antes pelo (71) 99950-4584.</div></details>
              <details><summary><span className="q">Funciona em iPhone e Android?</span><span className="plus">+</span></summary><div className="a">Sim, em qualquer celular com navegador. Também pode ser instalado como app na tela inicial (PWA), sem precisar da App Store.</div></details>
              <details><summary><span className="q">Preciso de internet o tempo todo?</span><span className="plus">+</span></summary><div className="a">Não. Os manuais ficam salvos em cache no celular depois da primeira abertura. Você consulta mesmo sem sinal na oficina.</div></details>
              <details><summary><span className="q">É vitalício mesmo? Sem mensalidade?</span><span className="plus">+</span></summary><div className="a">Sim. Você paga uma vez (R$ 67) e acessa para sempre, incluindo as atualizações futuras de manuais.</div></details>
              <details><summary><span className="q">E se vocês saírem do ar?</span><span className="plus">+</span></summary><div className="a">Você pode baixar os PDFs dos manuais que mais usa e guardar no celular ou na nuvem. Seu acesso nunca some.</div></details>
              <details><summary><span className="q">Como recebo o acesso?</span><span className="plus">+</span></summary><div className="a">Imediato após o pagamento: você recebe login por e-mail e WhatsApp em menos de 2 minutos.</div></details>
              <details><summary><span className="q">Posso falar com vocês antes de comprar?</span><span className="plus">+</span></summary><div className="a">Pode! WhatsApp (71) 99950-4584, resposta em até 10 minutos. Não é robô.</div></details>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="final">
              <span className="eyebrow">Acesso vitalício</span>
              <h2>Garanta seu acesso por R$ 67</h2>
              <p>Paga uma vez e usa pra sempre, sem mensalidade. Cada dia parado é serviço que vai pra concorrência.</p>
              <a className="btn" href="/register">Quero acessar agora <span className="pill">R$ 67 no PIX</span></a>
              <span className="cta-sub">🔒 Pagamento seguro via PIX · Liberação imediata · Garantia de 30 dias</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap fx">
          <span className="logo" style={{ fontSize: "1rem" }}>Oficina<b>Digital</b></span>
          <div className="links">
            <a href="https://wa.me/5571999504584">WhatsApp (71) 99950-4584</a>
            <a href="/login">Entrar</a>
            <a href="/register">Criar conta</a>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: "14px", fontFamily: "var(--mono)", fontSize: ".74rem", color: "var(--muted-2)" }}>manualdeservicos.store · contato@manualdeservicos.store</div>
      </footer>

      <div className="buybar">
        <div className="p">R$ 67<small>único · vitalício</small></div>
        <a className="btn" href="/register">Quero acessar</a>
      </div>
    </div>
  );
}
