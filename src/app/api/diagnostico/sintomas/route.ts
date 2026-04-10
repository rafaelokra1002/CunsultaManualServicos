import { NextResponse } from "next/server";
import { diagnosticarPorSintoma, getMotoById } from "@/data/ecu-database";

export async function POST(req: Request) {
  const { motoId, sintoma } = await req.json();

  if (!motoId || !sintoma || typeof motoId !== "string" || typeof sintoma !== "string") {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const moto = getMotoById(motoId);
  if (!moto) {
    return NextResponse.json({ error: "Moto não encontrada" }, { status: 404 });
  }

  const resultados = diagnosticarPorSintoma(motoId, sintoma);

  return NextResponse.json({
    moto: { id: moto.id, marca: moto.marca, modelo: moto.modelo },
    sintoma,
    resultados,
  });
}
