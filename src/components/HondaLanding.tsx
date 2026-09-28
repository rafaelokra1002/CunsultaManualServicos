const CSS = `
.hd{
  --bg:#0f1113;--bg-2:#0a0b0d;--surface:#1a1d21;--surface-2:#23272c;
  --line:#31353c;--line-soft:#25282e;--ink:#f4f1ec;--muted:#98a0aa;--muted-2:#6b7178;
  --signal:#ff6a1a;--signal-2:#ff8c3f;--signal-dim:rgba(255,106,26,.12);
  --ok:#3ac47d;--ok-dim:rgba(58,196,125,.12);--warn:#e5484d;--warn-dim:rgba(229,72,77,.12);
  --r:14px;--maxw:1060px;
  --disp:var(--font-display),"Archivo",system-ui,sans-serif;
  --body:var(--font-body),"IBM Plex Sans",system-ui,sans-serif;
  --mono:var(--font-mono),"IBM Plex Mono",ui-monospace,monospace;
  background:var(--bg);color:var(--ink);font-family:var(--body);line-height:1.55;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}
.hd *{box-sizing:border-box}
.hd .wrap{max-width:var(--maxw);margin:0 auto;padding-inline:20px}
.hd section{padding-block:clamp(46px,7.5vw,84px)}
.hd h1,.hd h2,.hd h3{font-family:var(--disp);margin:0;line-height:1.05;text-wrap:balance;letter-spacing:-.015em}
.hd h1{font-weight:900;font-size:clamp(2rem,6.6vw,3.4rem)}
.hd h2{font-weight:800;font-size:clamp(1.6rem,4.6vw,2.4rem)}
.hd h3{font-weight:700;font-size:1.05rem}
.hd p{margin:0}
.hd a{color:inherit;text-decoration:none}
.hd .eyebrow{font-family:var(--mono);font-size:.72rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--signal);display:inline-flex;align-items:center;gap:9px}
.hd .eyebrow::before{content:"";width:22px;height:2px;background:var(--signal);flex:none}
.hd .lead{color:var(--muted);font-size:clamp(1rem,2.3vw,1.15rem);max-width:58ch}
.hd .head{max-width:62ch}
.hd .head h2{margin-top:15px}
.hd .head .lead{margin-top:14px}
.hd .center{text-align:center;margin-inline:auto}
.hd .center .eyebrow{justify-content:center}
.hd .center .lead{margin-inline:auto}

.hd .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:var(--disp);font-weight:800;font-size:1.02rem;padding:16px 26px;border-radius:12px;border:0;cursor:pointer;background:linear-gradient(180deg,var(--signal-2),var(--signal));color:#1a0e05;box-shadow:0 8px 24px -8px rgba(255,106,26,.6);transition:transform .12s ease,box-shadow .12s ease;text-align:center}
.hd .btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px -8px rgba(255,106,26,.7)}
.hd .btn:focus-visible{outline:3px solid var(--signal-2);outline-offset:3px}
.hd .btn .pill{font-family:var(--mono);font-weight:700;background:rgba(26,14,5,.16);padding:2px 8px;border-radius:6px;font-size:.9rem}
.hd .btn-ghost{background:transparent;color:var(--ink);border:1px solid var(--line);box-shadow:none;font-size:.9rem;padding:11px 18px}
.hd .btn-ghost:hover{border-color:var(--signal);transform:none;box-shadow:none}
.hd .cta-sub{font-family:var(--mono);font-size:.8rem;color:var(--muted);text-align:center}
.hd .cta-block{display:flex;flex-direction:column;gap:11px;align-items:center;margin-top:34px}

.hd .topbar{background:linear-gradient(90deg,var(--surface),var(--surface-2),var(--surface));border-bottom:1px solid var(--line);font-family:var(--mono);font-size:.75rem;letter-spacing:.03em;color:var(--muted);text-align:center;padding:9px 16px}
.hd .topbar b{color:var(--ink);font-weight:600}
.hd .topbar .dot{color:var(--signal)}
.hd nav{position:sticky;top:0;z-index:40;background:rgba(15,17,19,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--line-soft)}
.hd .nav-in{display:flex;align-items:center;justify-content:space-between;padding-block:13px;gap:12px}
.hd .logo{font-family:var(--disp);font-weight:900;font-size:1.15rem;letter-spacing:-.02em;display:flex;align-items:center;gap:9px}
.hd .logo .mark{width:26px;height:26px;border-radius:7px;background:var(--signal);color:#1a0e05;display:grid;place-items:center;font-size:1rem;flex:none}
.hd .logo b{color:var(--signal)}

.hd .hero{padding-top:clamp(36px,6vw,60px)}
.hd .hero-grid{display:grid;grid-template-columns:1.02fr .98fr;gap:clamp(28px,4vw,52px);align-items:center}
.hd .badge{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:.76rem;background:var(--surface);border:1px solid var(--line);padding:7px 13px;border-radius:999px}
.hd .badge .g{width:7px;height:7px;border-radius:50%;background:var(--ok);box-shadow:0 0 0 4px var(--ok-dim);flex:none}
.hd .hero h1{margin-top:18px}
.hd .hero h1 .s{color:var(--signal)}
.hd .hero .lead{margin-top:18px}
.hd .hero-cta{margin-top:28px;display:flex;flex-direction:column;gap:12px;align-items:flex-start}
.hd .trustline{display:flex;flex-wrap:wrap;gap:6px 16px;font-family:var(--mono);font-size:.77rem;color:var(--muted)}
.hd .trustline span{display:inline-flex;align-items:center;gap:6px}
.hd .trustline .k{color:var(--signal)}

.hd .meter{background:radial-gradient(120% 80% at 80% 0,rgba(255,106,26,.10),transparent 60%),var(--bg-2);border:1px solid var(--line);border-radius:18px;padding:20px;box-shadow:0 30px 60px -30px #000,0 0 0 1px rgba(255,255,255,.02) inset;font-family:var(--mono);position:relative;overflow:hidden}
.hd .meter::before{content:"";position:absolute;inset:0;background-image:linear-gradient(var(--line-soft) 1px,transparent 1px);background-size:100% 34px;opacity:.3;pointer-events:none}
.hd .m-head{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted-2);border-bottom:1px solid var(--line);padding-bottom:11px;margin-bottom:14px;position:relative}
.hd .m-head .live{display:inline-flex;align-items:center;gap:7px;color:var(--warn);white-space:nowrap}
.hd .m-head .live i{width:8px;height:8px;border-radius:50%;background:var(--warn);box-shadow:0 0 8px var(--warn);animation:hdblink 1.1s steps(1) infinite;flex:none}
@keyframes hdblink{50%{opacity:.15;box-shadow:none}}
.hd .m-row{display:flex;justify-content:space-between;align-items:center;gap:14px;font-size:.88rem;padding:6px 0;position:relative}
.hd .m-row .l{color:var(--muted)}
.hd .m-row .v{color:var(--ink);font-weight:600;display:inline-flex;align-items:center}
.hd .m-div{height:1px;background:var(--line);margin:12px 0;position:relative}
.hd .display{position:relative;background:#07120c;border:1px solid rgba(58,196,125,.3);border-radius:12px;padding:16px 18px;margin-top:4px;display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
.hd .display .val{font-family:var(--mono);font-weight:700;font-size:clamp(2.1rem,7vw,2.9rem);color:var(--ok);line-height:1;letter-spacing:-.02em;text-shadow:0 0 18px rgba(58,196,125,.45)}
.hd .display .val em{font-style:normal;font-size:1.1rem;margin-left:6px}
.hd .display .verdict{text-align:right;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ok);white-space:nowrap}
.hd .display .verdict b{display:block;font-size:.95rem;letter-spacing:.02em;text-transform:none;margin-top:3px}
.hd .m-foot{display:flex;justify-content:space-between;gap:10px;font-size:.72rem;color:var(--muted-2);margin-top:13px;position:relative;flex-wrap:wrap}

.hd .blinks{display:inline-flex;align-items:center;gap:6px}
.hd .blinks i{width:10px;height:10px;border-radius:50%;background:var(--warn);opacity:.2;box-shadow:0 0 10px rgba(229,72,77,.6);animation:hdpulse 4s infinite}
.hd .blinks i:nth-child(1){animation-delay:0s}
.hd .blinks i:nth-child(2){animation-delay:.28s}
.hd .blinks i:nth-child(3){animation-delay:.56s}
.hd .blinks i:nth-child(4){animation-delay:.84s}
.hd .blinks i:nth-child(5){animation-delay:1.12s}
.hd .blinks i:nth-child(6){animation-delay:1.4s}
.hd .blinks i:nth-child(7){animation-delay:1.68s}
.hd .blinks i:nth-child(8){animation-delay:1.96s}
@keyframes hdpulse{0%,100%{opacity:.18}4%,9%{opacity:1}14%{opacity:.18}}

.hd .grid{display:grid;gap:16px;margin-top:34px}
.hd .g3{grid-template-columns:repeat(3,1fr)}
.hd .g2{grid-template-columns:repeat(2,1fr)}
.hd .step{background:linear-gradient(180deg,var(--surface),var(--bg-2));border:1px solid var(--line-soft);border-radius:var(--r);padding:22px}
.hd .step .n{font-family:var(--mono);font-size:.75rem;color:var(--signal);letter-spacing:.14em}
.hd .step h3{margin-top:11px}
.hd .step p{color:var(--muted);font-size:.92rem;margin-top:8px}
.hd .step .chip{display:inline-block;font-family:var(--mono);font-size:.78rem;background:var(--bg-2);border:1px solid var(--line);color:var(--ink);padding:5px 10px;border-radius:8px;margin-top:13px}

.hd .proof{margin-top:34px;background:var(--bg-2);border:1px solid var(--line);border-radius:16px;overflow:hidden}
.hd .proof-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 18px;border-bottom:1px solid var(--line);font-family:var(--mono);font-size:.76rem;color:var(--muted);flex-wrap:wrap}
.hd .proof-head b{color:var(--ink);font-weight:600}
.hd .tbl{width:100%;border-collapse:collapse;font-size:.88rem}
.hd .tbl th{font-family:var(--mono);font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2);text-align:left;padding:11px 18px;border-bottom:1px solid var(--line);font-weight:600;background:rgba(255,255,255,.015)}
.hd .tbl td{padding:12px 18px;border-bottom:1px solid var(--line-soft);vertical-align:middle}
.hd .tbl tr:last-child td{border-bottom:0}
.hd .tbl tr.hi td{background:var(--signal-dim)}
.hd .tbl .pin{font-family:var(--mono);font-weight:700;color:var(--ink);width:1%;white-space:nowrap}
.hd .tbl .wire{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:.82rem;white-space:nowrap}
.hd .tbl .sw{width:14px;height:14px;border-radius:4px;border:1px solid rgba(255,255,255,.22);flex:none}
.hd .tbl .fn{color:var(--muted)}
.hd .tbl .rng{font-family:var(--mono);color:var(--ink);white-space:nowrap}
.hd .proof-foot{padding:13px 18px;font-family:var(--mono);font-size:.73rem;color:var(--muted-2);border-top:1px solid var(--line);line-height:1.6}

.hd .flow{display:flex;flex-direction:column;gap:12px;margin-top:34px}
.hd .fl{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:start;background:var(--surface);border:1px solid var(--line-soft);border-radius:var(--r);padding:18px 20px}
.hd .fl .ic{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-size:1.05rem;background:var(--bg-2);border:1px solid var(--line);flex:none}
.hd .fl.warn .ic{border-color:rgba(229,72,77,.4);color:var(--warn)}
.hd .fl.ok .ic{border-color:rgba(58,196,125,.4);color:var(--ok)}
.hd .fl h3{font-size:1rem}
.hd .fl p{color:var(--muted);font-size:.92rem;margin-top:6px}
.hd .fl .val{font-family:var(--mono);color:var(--ink)}
.hd .verdictbox{margin-top:30px;border:1px solid rgba(255,106,26,.32);background:var(--signal-dim);border-radius:16px;padding:24px;text-align:center;max-width:620px;margin-inline:auto}
.hd .verdictbox p{font-family:var(--disp);font-weight:800;font-size:clamp(1.1rem,3.2vw,1.45rem);line-height:1.25}
.hd .verdictbox .a{color:var(--signal)}

.hd .pain{display:flex;flex-direction:column;gap:10px;max-width:620px;margin:32px auto 0;padding:0}
.hd .pain li{list-style:none;display:flex;gap:13px;align-items:flex-start;background:var(--warn-dim);border:1px solid rgba(229,72,77,.22);border-radius:11px;padding:14px 16px;color:#f2cdce;font-size:.94rem}
.hd .pain .x{color:var(--warn);font-family:var(--mono);font-weight:700;flex:none}

.hd .tool{background:var(--surface);border:1px solid var(--line-soft);border-radius:var(--r);padding:22px;display:flex;flex-direction:column;gap:7px}
.hd .tool .k{font-family:var(--mono);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--signal)}
.hd .tool .q{color:var(--ink);font-size:.95rem;font-weight:600}
.hd .tool p{color:var(--muted);font-size:.9rem;margin-top:2px}
.hd .bonus{margin-top:16px;border:1px dashed rgba(255,106,26,.4);background:var(--signal-dim);border-radius:var(--r);padding:20px 22px;display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center}
.hd .bonus .tag{font-family:var(--mono);font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--signal);border:1px solid rgba(255,106,26,.4);padding:6px 10px;border-radius:8px;white-space:nowrap}
.hd .bonus h3{font-size:1rem}
.hd .bonus p{color:var(--muted);font-size:.9rem;margin-top:5px}

.hd .vs{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:34px}
.hd .vs-col{border-radius:var(--r);padding:24px;border:1px solid var(--line-soft);background:var(--bg-2)}
.hd .vs-col.us{border-color:rgba(255,106,26,.35);background:linear-gradient(180deg,var(--surface),var(--bg-2))}
.hd .vs-col .t{font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted-2)}
.hd .vs-col.us .t{color:var(--signal)}
.hd .vs-col h3{margin-top:10px;font-size:1.08rem}
.hd .vs-col ul{list-style:none;padding:0;margin:18px 0 0;display:flex;flex-direction:column;gap:11px}
.hd .vs-col li{display:flex;gap:10px;font-size:.91rem;color:var(--muted);align-items:flex-start}
.hd .vs-col li .m{font-family:var(--mono);font-weight:700;flex:none}
.hd .vs-col.them li .m{color:var(--warn)}
.hd .vs-col.us li{color:var(--ink)}
.hd .vs-col.us li .m{color:var(--ok)}

.hd .facts{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:32px}
.hd .fact{background:var(--bg-2);border:1px solid var(--line-soft);border-radius:12px;padding:18px}
.hd .fact .t{font-family:var(--mono);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2)}
.hd .fact h3{font-size:.97rem;margin-top:9px}
.hd .fact p{color:var(--muted);font-size:.87rem;margin-top:6px}

.hd .offer{border:1px solid rgba(255,106,26,.32);background:linear-gradient(180deg,var(--surface),var(--bg-2));border-radius:20px;padding:clamp(26px,4vw,40px);max-width:720px;margin:36px auto 0;text-align:center;box-shadow:0 30px 70px -40px #000}
.hd .offer .k{font-family:var(--mono);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--signal)}
.hd .offer h2{margin-top:12px}
.hd .offer ul{list-style:none;padding:0;margin:26px auto 0;display:flex;flex-direction:column;gap:11px;text-align:left;max-width:460px}
.hd .offer li{display:flex;gap:11px;align-items:flex-start;font-size:.95rem;color:var(--ink)}
.hd .offer li .c{color:var(--ok);font-family:var(--mono);font-weight:700;flex:none}
.hd .price{margin-top:30px;display:flex;align-items:baseline;justify-content:center;gap:10px;flex-wrap:wrap}
.hd .price .cur{font-family:var(--mono);color:var(--muted);font-size:1.05rem}
.hd .price .num{font-family:var(--disp);font-weight:900;font-size:clamp(3rem,11vw,4.2rem);line-height:1;color:var(--ink);letter-spacing:-.03em}
.hd .price .per{font-family:var(--mono);color:var(--muted);font-size:.85rem}
.hd .anchor{font-family:var(--mono);font-size:.88rem;color:var(--signal-2);margin-top:12px}
.hd .guarantee{margin-top:30px;display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center;text-align:left;border:1px solid var(--line);background:var(--bg-2);border-radius:14px;padding:18px 20px;max-width:520px;margin-inline:auto}
.hd .guarantee .seal{width:58px;height:58px;border-radius:50%;border:2px solid var(--ok);color:var(--ok);display:grid;place-items:center;font-family:var(--mono);font-weight:700;line-height:1;text-align:center;font-size:1.25rem;flex:none}
.hd .guarantee .seal small{display:block;font-size:.5rem;letter-spacing:.1em}
.hd .guarantee h3{font-size:.97rem}
.hd .guarantee p{color:var(--muted);font-size:.88rem;margin-top:5px}

.hd footer{border-top:1px solid var(--line-soft);padding-block:30px;color:var(--muted-2);font-size:.85rem}
.hd .foot-in{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;justify-content:space-between}
.hd .foot-links{display:flex;gap:18px;flex-wrap:wrap}
.hd .foot-links a:hover{color:var(--signal)}
.hd .sticky{position:fixed;left:0;right:0;bottom:0;z-index:50;display:none;gap:12px;align-items:center;justify-content:space-between;padding:11px 16px;background:rgba(15,17,19,.94);backdrop-filter:blur(12px);border-top:1px solid var(--line)}
.hd .sticky .p{font-family:var(--mono);font-size:.76rem;color:var(--muted);line-height:1.3}
.hd .sticky .p b{display:block;color:var(--ink);font-size:1rem}
.hd .sticky .btn{padding:13px 18px;font-size:.92rem}

@media (max-width:900px){
  .hd .hero-grid{grid-template-columns:1fr}
  .hd .g3,.hd .g2{grid-template-columns:1fr}
  .hd .facts{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:640px){
  .hd .hero-cta{align-items:stretch}
  .hd .hero-cta .btn,.hd .cta-block .btn{width:100%}
  .hd .facts{grid-template-columns:1fr}
  .hd .vs{grid-template-columns:1fr}
  .hd .bonus{grid-template-columns:1fr}
  .hd .tbl th:nth-child(3),.hd .tbl td:nth-child(3){display:none}
  .hd .tbl th,.hd .tbl td{padding-inline:13px}
  .hd .sticky{display:flex}
  .hd main{padding-bottom:78px}
}
@media (prefers-reduced-motion:reduce){
  .hd .blinks i,.hd .m-head .live i{animation:none;opacity:1}
  .hd .btn:hover{transform:none}
}
`;

type PinRow = {
  pin: string;
  wire: string;
  colors: string[];
  fn: string;
  range: string;
  hi?: boolean;
};

const PINOUT: PinRow[] = [
  { pin: "4", wire: "Vd/Bc", colors: ["#22c55e", "#f8fafc"], fn: "Terra (EOT / TPS)", range: "referência" },
  { pin: "5", wire: "Am", colors: ["#eab308"], fn: "Sinal TPS", range: "0,29 – 0,71 V", hi: true },
  { pin: "6", wire: "Am/Vm", colors: ["#eab308", "#ef4444"], fn: "Alimentação TPS (5V)", range: "4,75 – 5,25 V" },
  { pin: "8", wire: "Az/Am", colors: ["#3b82f6", "#eab308"], fn: "Sinal MAP", range: "0,50 – 4,50 V" },
  { pin: "24", wire: "Am/Az", colors: ["#eab308", "#3b82f6"], fn: "Sinal EOT (temp. óleo)", range: "2,70 – 3,10 V" },
  { pin: "16", wire: "Rs/Bc", colors: ["#ec4899", "#f8fafc"], fn: "Bico injetor", range: "11,0 – 13,0 Ω" },
];

function Wire({ colors, label }: { colors: string[]; label: string }) {
  const background =
    colors.length > 1
      ? `linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%)`
      : colors[0];
  return (
    <span className="wire">
      <span className="sw" style={{ background }} />
      {label}
    </span>
  );
}

export default function HondaLanding() {
  return (
    <div className="hd">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="topbar">
        <span className="dot">●</span> Pagamento único de <b>R$ 67</b> · Acesso vitalício, sem mensalidade · Garantia de 30 dias
      </div>

      <nav>
        <div className="wrap nav-in">
          <span className="logo"><span className="mark">⚙</span>Oficina<b>Digital</b></span>
          <a className="btn btn-ghost" href="/login">Já tenho conta</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="badge"><span className="g" />+300 mecânicos usando no Brasil</span>
              <h1>Injeção Honda: ache o defeito <span className="s">com o multímetro</span> — e pare de condenar peça boa</h1>
              <p className="lead">
                Conte as piscadas do painel, abra o pino certo e compare com a faixa do manual.
                23 modelos Honda de 2009 a 2026, com a cor do fio e o valor que tem que aparecer no visor.
                No celular, funcionando offline na bancada.
              </p>
              <div className="hero-cta">
                <a className="btn" href="/register">Quero acessar agora <span className="pill">R$ 67 no PIX</span></a>
                <div className="trustline">
                  <span><span className="k">◆</span> Sem scanner</span>
                  <span><span className="k">◆</span> PIX · liberação imediata</span>
                  <span><span className="k">◆</span> Garantia de 30 dias</span>
                </div>
              </div>
            </div>

            <div className="meter" aria-label="Exemplo de medição do sensor TPS numa Honda CG 160">
              <div className="m-head">
                <span>Honda CG 160 · TPS</span>
                <span className="live"><i />MIL acesa</span>
              </div>
              <div className="m-row"><span className="l">CÓDIGO</span><span className="v">8 piscadas</span></div>
              <div className="m-row">
                <span className="l">PAINEL</span>
                <span className="v">
                  <span className="blinks" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></span>
                </span>
              </div>
              <div className="m-row"><span className="l">PINO</span><span className="v">5 · fio Am</span></div>
              <div className="m-row"><span className="l">ESCALA</span><span className="v">20 V ⎓</span></div>
              <div className="m-div" />
              <div className="display">
                <span className="val">0.52<em>V</em></span>
                <span className="verdict">na faixa<b>0,29 – 0,71 V</b></span>
              </div>
              <div className="m-foot"><span>borboleta fechada</span><span>fonte: manual oficial Honda</span></div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">Eu não leio mente, mas…</span>
              <h2>Sei que isso já aconteceu na sua bancada</h2>
            </div>
            <ul className="pain">
              <li><span className="x">✕</span><span>A luz da injeção acende e você não sabe o que aquele código quer dizer</span></li>
              <li><span className="x">✕</span><span>Pega peça de outra moto só pra testar se era ela</span></li>
              <li><span className="x">✕</span><span>Testou alimentação e aterramento… e travou ali</span></li>
              <li><span className="x">✕</span><span>Troca o TPS, o sensor, o módulo — e o defeito continua</span></li>
              <li><span className="x">✕</span><span>Tem medo de condenar peça boa e pagar do próprio bolso</span></li>
            </ul>
            <div className="verdictbox">
              <p>Não é falta de competência. É falta do <span className="a">valor certo</span> na mão na hora da medição.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">Como funciona na bancada</span>
              <h2>Três olhadas. Um diagnóstico.</h2>
              <p className="lead">Sem scanner, sem laudo externo, sem esperar. Só o multímetro que você já tem.</p>
            </div>
            <div className="grid g3">
              <div className="step">
                <span className="n">01 · CÓDIGO</span>
                <h3>Conte as piscadas</h3>
                <p>A luz do painel pisca o código da falha. Você escolhe o modelo e quantas piscadas viu — o app diz qual peça está acusando.</p>
                <span className="chip">8 piscadas → TPS</span>
              </div>
              <div className="step">
                <span className="n">02 · PINO</span>
                <h3>Ache o fio certo</h3>
                <p>A pinagem da ECU já vem pronta: número do pino, cor do fio e função. Nada de abrir chicote no escuro.</p>
                <span className="chip">pino 5 · fio Am · sinal TPS</span>
              </div>
              <div className="step">
                <span className="n">03 · MEDIDA</span>
                <h3>Compare com a faixa</h3>
                <p>O manual diz o que tem que aparecer no visor. Deu fora da faixa? Agora você sabe onde está o problema.</p>
                <span className="chip">0,29 – 0,71 V fechado</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">Página real de dentro do app</span>
              <h2>É esse nível de detalhe</h2>
              <p className="lead">
                Não é uma pilha de manual pra você ficar procurando. É o pino, a cor do fio e o valor esperado, prontos pra medição.
              </p>
            </div>

            <div className="proof">
              <div className="proof-head">
                <span>Pinagem ECU · <b>Honda CG 160 (2016–2026)</b></span>
                <span>PGM-FI KEIHIN · 38 pinos</span>
              </div>
              <table className="tbl">
                <thead>
                  <tr><th>Pino</th><th>Cor do fio</th><th>Função</th><th>Leitura esperada</th></tr>
                </thead>
                <tbody>
                  {PINOUT.map((p) => (
                    <tr key={p.pin} className={p.hi ? "hi" : undefined}>
                      <td className="pin">{p.pin}</td>
                      <td><Wire colors={p.colors} label={p.wire} /></td>
                      <td className="fn">{p.fn}</td>
                      <td className="rng">{p.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="proof-foot">
                Vd=Verde · Am=Amarelo · Az=Azul · Vm=Vermelho · Bc=Branco · Rs=Rosa — 536 pinos mapeados em 23 modelos Honda
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">Na prática</span>
              <h2>Uma moto. Um defeito. Do painel até o veredito.</h2>
            </div>

            <div className="flow">
              <div className="fl warn">
                <span className="ic">⚠</span>
                <div>
                  <h3>A luz da injeção acendeu</h3>
                  <p>Honda CG 160 na bancada. Conta as piscadas da MIL: <span className="val">8 piscadas</span> — o código aponta o sensor TPS.</p>
                </div>
              </div>
              <div className="fl">
                <span className="ic">🔌</span>
                <div>
                  <h3>Primeiro: chegam os 5 V no sensor?</h3>
                  <p>Mede a alimentação no fio <span className="val">Am/Vm</span> contra o terra. Tem que dar <span className="val">4,75 – 5,25 V</span>. Se não chega, o problema está antes do sensor.</p>
                </div>
              </div>
              <div className="fl">
                <span className="ic">📐</span>
                <div>
                  <h3>Agora o sinal do sensor</h3>
                  <p>Fio <span className="val">Am</span> contra <span className="val">Vd/Bc</span>: <span className="val">0,29 – 0,71 V</span> com a borboleta fechada e <span className="val">4,13 – 4,76 V</span> acelerada. Deu fora da faixa? O sensor é o culpado.</p>
                </div>
              </div>
              <div className="fl ok">
                <span className="ic">✓</span>
                <div>
                  <h3>O sensor está bom. E agora?</h3>
                  <p>Testa a continuidade do fio <span className="val">Am</span> até o <span className="val">pino 5</span> da central. Se o sinal não chega lá, o defeito está na fiação ou no conector — <b>não no sensor</b>.</p>
                </div>
              </div>
              <div className="fl">
                <span className="ic">🔁</span>
                <div>
                  <h3>Consertou? Apaga o código sem scanner</h3>
                  <p>O reset de defeitos da ECM está no passo a passo, feito pelo conector de diagnóstico — sem equipamento caro.</p>
                </div>
              </div>
            </div>

            <div className="verdictbox">
              <p>Não é adivinhação. É <span className="a">sequência de diagnóstico</span> — e ela cabe no seu celular.</p>
            </div>

            <div className="cta-block">
              <a className="btn" href="/register">Quero acessar agora <span className="pill">R$ 67 no PIX</span></a>
              <span className="cta-sub">PIX · liberação na hora · garantia de 30 dias</span>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">O que vem dentro</span>
              <h2>Quatro ferramentas de bancada</h2>
              <p className="lead">Não é PDF pra você rolar no celular. É consulta: escolhe a moto, acha o dado, mede.</p>
            </div>

            <div className="grid g2">
              <div className="tool">
                <span className="k">01 · Diagnóstico</span>
                <span className="q">Qual peça a luz está acusando?</span>
                <p>Código por piscadas da MIL na linha Honda, com a sequência de testes de cada falha: alimentação, sinal, curto e continuidade.</p>
              </div>
              <div className="tool">
                <span className="k">02 · Pinagem ECU</span>
                <span className="q">O sinal chegou na central?</span>
                <p>536 pinos mapeados em 23 modelos Honda de 2009 a 2026, separados por ano e por versão da ECU — com número do pino, cor do fio e função de cada um.</p>
              </div>
              <div className="tool">
                <span className="k">03 · Parâmetros</span>
                <span className="q">O valor está dentro da faixa?</span>
                <p>360 parâmetros com mínimo e máximo: TPS, MAP, EOT, sensor O2, CKP, bico injetor, bobina, compressão e folga de válvula.</p>
              </div>
              <div className="tool">
                <span className="k">04 · Reset ECM</span>
                <span className="q">Como apago o código?</span>
                <p>Reset de defeitos, do TPS e da altitude, no passo a passo — sem scanner. Mais a calculadora de folga de válvulas.</p>
              </div>
            </div>

            <div className="bonus">
              <span className="tag">Vem junto</span>
              <div>
                <h3>+2.300 manuais de serviço oficiais</h3>
                <p>
                  O acervo completo de 16 montadoras — Honda, Yamaha, Suzuki, Kawasaki, KTM, BMW e outras — pra quando a moto na bancada
                  não for Honda. Mais pinagem de 8 modelos Yamaha e 1 Kawasaki.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">Por que não vendemos um e-book</span>
              <h2>A diferença aparece com a moto na bancada</h2>
              <p className="lead">
                Apostila de pinagem em PDF você já viu. O problema nunca foi ter o dado — foi achar o dado com a mão suja
                e o cliente esperando.
              </p>
            </div>

            <div className="vs">
              <div className="vs-col them">
                <span className="t">E-book em PDF</span>
                <h3>Você procura dentro do arquivo</h3>
                <ul>
                  <li><span className="m">✕</span><span>Rola o PDF atrás do modelo e do ano certo</span></li>
                  <li><span className="m">✕</span><span>Anota a cor do fio num papel pra não esquecer</span></li>
                  <li><span className="m">✕</span><span>Achou o pino, mas o parâmetro está em outra apostila</span></li>
                  <li><span className="m">✕</span><span>Só dá pra buscar por modelo — nunca pelo sintoma</span></li>
                </ul>
              </div>
              <div className="vs-col us">
                <span className="t">Consulta no app</span>
                <h3>O dado já vem pronto na tela</h3>
                <ul>
                  <li><span className="m">✓</span><span>Escolhe a moto e o ano: a pinagem abre montada</span></li>
                  <li><span className="m">✓</span><span>Cor do fio, função e faixa do multímetro na mesma tela</span></li>
                  <li><span className="m">✓</span><span>Pinagem e parâmetro juntos, sem trocar de arquivo</span></li>
                  <li><span className="m">✓</span><span>Busca por sintoma: &quot;moto falhando&quot; já lista o que testar</span></li>
                </ul>
              </div>
            </div>

            <div className="verdictbox">
              <p>Você não precisa <span className="a">decorar cor de fio</span>. Precisa dela na tela na hora da medição.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow">Antes de comprar</span>
              <h2>O que isso é — e o que não é</h2>
              <p className="lead">Melhor você saber agora do que pedir reembolso depois.</p>
            </div>
            <div className="facts">
              <div className="fact">
                <span className="t">Formato</span>
                <h3>É app no celular</h3>
                <p>Abre no navegador e instala como aplicativo. Funciona offline na oficina, sem depender do sinal.</p>
              </div>
              <div className="fact">
                <span className="t">Foco</span>
                <h3>O forte é Honda</h3>
                <p>23 modelos Honda com pinagem completa. Yamaha e Kawasaki entram em número menor.</p>
              </div>
              <div className="fact">
                <span className="t">Equipamento</span>
                <h3>Sem scanner</h3>
                <p>Tudo é feito com um multímetro comum. Nenhum equipamento caro é necessário.</p>
              </div>
              <div className="fact">
                <span className="t">Formato</span>
                <h3>Não é curso em vídeo</h3>
                <p>É consulta técnica de bancada. Você já sabe usar o multímetro — o que falta é o valor certo.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="offer">
              <span className="k">Acesso completo · Oficina Digital</span>
              <h2>Sua oficina inteira dentro do celular</h2>
              <ul>
                <li><span className="c">✓</span><span>Diagnóstico por piscadas da MIL, com a sequência de testes de cada falha</span></li>
                <li><span className="c">✓</span><span>536 pinos em 23 modelos Honda: pino, cor do fio e função</span></li>
                <li><span className="c">✓</span><span>360 parâmetros com faixa mínima e máxima pra comparar no multímetro</span></li>
                <li><span className="c">✓</span><span>Reset de ECM sem scanner e calculadora de folga de válvulas</span></li>
                <li><span className="c">✓</span><span>+2.300 manuais oficiais de 16 montadoras</span></li>
                <li><span className="c">✓</span><span>Funciona offline · pagou, acessou na hora</span></li>
              </ul>

              <div className="price">
                <span className="cur">R$</span>
                <span className="num">67</span>
                <span className="per">uma vez só</span>
              </div>
              <p className="anchor">é menos que uma peça trocada no chute</p>

              <div className="cta-block">
                <a className="btn" href="/register">Quero acessar agora <span className="pill">R$ 67 no PIX</span></a>
                <span className="cta-sub">PIX · liberação imediata · acesso vitalício, sem mensalidade</span>
              </div>

              <div className="guarantee">
                <span className="seal">30<small>DIAS</small></span>
                <div>
                  <h3>Garantia de 30 dias, risco zero</h3>
                  <p>Entrou e não era pra você? Devolvemos 100% do valor. Sem perguntas, sem burocracia. Empresa com CNPJ e atendimento humano no WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot-in">
          <span>© 2026 OficinaDigital · Manuais de serviço de motocicletas</span>
          <span className="foot-links">
            <a href="https://wa.me/5571999504584">WhatsApp (71) 99950-4584</a>
            <a href="/login">Entrar</a>
            <a href="/register">Criar conta</a>
          </span>
        </div>
      </footer>

      <div className="sticky">
        <span className="p">R$ 67 no PIX<b>Acesso vitalício</b></span>
        <a className="btn" href="/register">Quero acessar</a>
      </div>
    </div>
  );
}
