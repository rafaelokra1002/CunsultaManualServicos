const PUSHINPAY_API_URL = "https://api.pushinpay.com.br/api/pix/cashIn";

interface PushinPayPixRequest {
  value: number; // valor em centavos
  webhook_url: string;
  external_reference?: string;
}

interface PushinPayPixResponse {
  id: string;
  status: string;
  value: number;
  qr_code: string;
  qr_code_base64: string;
  expires_at: string;
}

export async function createPixPayment({
  valueInCents,
  webhookUrl,
  externalReference,
}: {
  valueInCents: number;
  webhookUrl: string;
  externalReference: string;
}): Promise<PushinPayPixResponse> {
  const token = process.env.PUSHINPAY_TOKEN;

  if (!token) {
    throw new Error("PUSHINPAY_TOKEN não configurado");
  }

  const payload: PushinPayPixRequest = {
    value: valueInCents,
    webhook_url: webhookUrl,
    external_reference: externalReference,
  };

  const response = await fetch(PUSHINPAY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("PushinPay error:", errorText);
    throw new Error(`Erro ao criar pagamento PIX: ${response.status}`);
  }

  return response.json();
}

// Valor do plano em centavos (R$ 34,90 = 3490 centavos)
export const PLAN_PRICE_CENTS = 3490;
export const PLAN_PRICE_ORIGINAL = "49,90";
export const PLAN_PRICE_CURRENT = "34,90";
