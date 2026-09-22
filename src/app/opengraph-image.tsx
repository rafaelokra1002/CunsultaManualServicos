import { ImageResponse } from "next/og";

export const alt = "OficinaDigital — diagnóstico e manuais de moto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", background: "#16181C", color: "#f3f0ea", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 800 }}>
          <div style={{ display: "flex", width: 44, height: 44, background: "#ff6a1a", borderRadius: 10, marginRight: 16 }} />
          <div style={{ display: "flex" }}>Oficina<span style={{ color: "#ff6a1a", marginLeft: 2 }}>Digital</span></div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", marginTop: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
            <div style={{ display: "flex", fontSize: 54, fontWeight: 800, lineHeight: 1.05 }}>Descubra qualquer defeito de moto em 5 minutos</div>
            <div style={{ display: "flex", fontSize: 25, color: "#9aa1ac", marginTop: 22 }}>+2.300 manuais oficiais · diagnóstico Honda sem scanner · calculadora de válvulas</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
              <div style={{ display: "flex", background: "#37c07a", color: "#0c1f14", fontSize: 30, fontWeight: 800, padding: "12px 22px", borderRadius: 12 }}>R$ 67 · vitalício</div>
              <div style={{ display: "flex", color: "#9aa1ac", fontSize: 22, marginLeft: 20 }}>garantia de 30 dias</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 40, flex: 1, background: "#111317", border: "1px solid #33373f", borderRadius: 20, padding: 26, fontFamily: "monospace" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: "#6c727c" }}>
              <div style={{ display: "flex" }}>DIAGNÓSTICO</div>
              <div style={{ display: "flex", alignItems: "center", color: "#e5484d" }}><div style={{ display: "flex", width: 10, height: 10, borderRadius: 5, background: "#e5484d", marginRight: 8 }} />AO VIVO</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, marginTop: 22 }}><span style={{ color: "#9aa1ac" }}>MODELO</span><span>Biz 110i</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, marginTop: 10 }}><span style={{ color: "#9aa1ac" }}>CÓDIGO</span><span>8 piscadas</span></div>
            <div style={{ display: "flex", flexDirection: "column", background: "rgba(255,106,26,0.14)", border: "1px solid #ff6a1a", borderRadius: 12, padding: 20, marginTop: 22 }}>
              <div style={{ display: "flex", fontSize: 15, color: "#ff6a1a" }}>RESULTADO</div>
              <div style={{ display: "flex", fontSize: 30, fontWeight: 800, marginTop: 8 }}>Falha no sensor TPS</div>
              <div style={{ display: "flex", fontSize: 22, color: "#ff8c3f", marginTop: 8 }}>teste os pinos 1 e 3</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
