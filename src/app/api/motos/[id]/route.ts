import { NextResponse } from "next/server";
import { getMotoById } from "@/data/ecu-database";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const moto = getMotoById(params.id);

  if (!moto) {
    return NextResponse.json({ error: "Moto não encontrada" }, { status: 404 });
  }

  return NextResponse.json(moto);
}
