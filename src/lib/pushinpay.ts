// Mistic Pay - API de Pagamento PIX
// Docs: https://api.misticpay.com/api

const MISTICPAY_BASE_URL = "https://api.misticpay.com/api";
const MISTICPAY_CLIENT_ID = process.env.MISTICPAY_CLIENT_ID || "";
const MISTICPAY_CLIENT_SECRET = process.env.MISTICPAY_CLIENT_SECRET || "";

// Valor do plano
export const PLAN_PRICE = 67.00;
export const PLAN_PRICE_ORIGINAL = "97,90";
export const PLAN_PRICE_CURRENT = "67,00";

interface CreatePixParams {
  amount: number;
  payerName: string;
  payerDocument: string;
  transactionId: string;
  description: string;
  webhookUrl?: string;
}

interface MisticPayResponse {
  message: string;
  data: {
    transactionId: string;
    payer: {
      name: string;
      document: string;
    };
    transactionFee: number;
    transactionType: string;
    transactionMethod: string;
    transactionAmount: number;
    transactionState: string;
    qrCodeBase64: string;
    qrcodeUrl: string;
    copyPaste: string;
  };
}

export async function createPixPayment(params: CreatePixParams): Promise<MisticPayResponse> {
  const response = await fetch(`${MISTICPAY_BASE_URL}/transactions/create`, {
    method: "POST",
    headers: {
      "ci": MISTICPAY_CLIENT_ID,
      "cs": MISTICPAY_CLIENT_SECRET,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amount,
      payerName: params.payerName,
      payerDocument: params.payerDocument,
      transactionId: params.transactionId,
      description: params.description,
      ...(params.webhookUrl && { projectWebhook: params.webhookUrl }),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Mistic Pay error:", response.status, errorText);
    throw new Error(`Erro na API Mistic Pay: ${response.status}`);
  }

  return response.json();
}
