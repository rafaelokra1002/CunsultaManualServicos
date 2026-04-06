import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Pagamentos agora são feitos pelo checkout do PushinPay
// Esta rota não é mais necessária para criação de pagamentos
export async function POST() {
  return NextResponse.json(
    { error: "Pagamentos são processados pelo checkout PushinPay" },
    { status: 410 }
  );
}
