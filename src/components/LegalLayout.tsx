import type { ReactNode } from "react";

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
.pp nav{border-bottom:1px solid var(--line-soft);padding-block:15px}
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
.pp .box .k{font-family:var(--mono);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--signal);display:block;margin-bottom:9px}
.pp .steps{counter-reset:s;display:flex;flex-direction:column;gap:14px;margin-top:6px;padding:0;list-style:none}
.pp .steps li{counter-increment:s;background:var(--surface);border:1px solid var(--line-soft);border-radius:12px;padding:16px 18px;display:block}
.pp .steps li::before{content:"PASSO " counter(s);font-family:var(--mono);font-size:.68rem;letter-spacing:.14em;color:var(--signal);display:block;margin-bottom:7px;line-height:1.4}
.pp footer{border-top:1px solid var(--line-soft);margin-top:34px;padding-block:28px 44px;color:var(--muted-2);font-size:.85rem;display:flex;flex-wrap:wrap;gap:10px 20px;justify-content:space-between}
`;

export default function LegalLayout({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
}) {
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
          <h1>{title}</h1>
          <p className="updated">Última atualização: {updated}</p>
          <p className="intro">{intro}</p>
        </header>

        {children}

        <footer>
          <span>© 2026 OficinaDigital · Manuais de serviço de motocicletas</span>
          <span>
            <a href="/politica-de-privacidade">Privacidade</a>
            {" · "}
            <a href="/termos">Termos</a>
            {" · "}
            <a href="https://wa.me/5571999504584">WhatsApp</a>
          </span>
        </footer>
      </div>
    </div>
  );
}
