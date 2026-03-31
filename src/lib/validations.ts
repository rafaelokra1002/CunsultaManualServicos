import { z } from "zod";

export const registerSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha muito longa"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const manualSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  brand: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  year: z
    .number()
    .int()
    .min(1900, "Ano inválido")
    .max(new Date().getFullYear() + 2, "Ano inválido"),
  fileUrl: z.string().min(1, "URL do arquivo é obrigatória"),
});

export const updateUserSchema = z.object({
  active: z.boolean(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ManualInput = z.infer<typeof manualSchema>;
