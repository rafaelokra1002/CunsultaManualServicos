import { NextResponse } from "next/server";
import { motosECU, searchMotos } from "@/data/ecu-database";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const motos = q ? searchMotos(q) : motosECU;

  return NextResponse.json(
    motos.map((m) => ({
      id: m.id,
      marca: m.marca,
      modelo: m.modelo,
      ano: m.ano,
      ecuTipo: m.ecuTipo,
      totalParametros: m.parametros.length,
      totalPinos: m.pinagem.length,
    }))
  );
}
