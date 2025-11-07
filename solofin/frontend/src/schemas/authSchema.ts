import { z } from 'zod';

// --- PASSWORD ---
const passwordValidation = z
  .string()
  .min(8, "Şifre en az 8 karakter olmalıdır")
  .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
  .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
  .regex(/[0-9]/, "Şifre en az bir rakam içermelidir")
  .regex(
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 
    "Şifre en az bir özel karakter içermelidir"
  );

// --- LOGIN---
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta alanı zorunludur")
    .email("Lütfen geçerli bir e-posta adresi girin"),
  password: z
    .string()
    .min(1, "Şifre alanı zorunludur"),
});

// --- REGISTER ---
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Ad Soyad en az 2 karakter olmalıdır"),
  email: z
    .string()
    .min(1, "E-posta alanı zorunludur")
    .email("Lütfen geçerli bir e-posta adresi girin"),
  password: passwordValidation,
  confirmPassword: z
    .string()
    .min(1, "Lütfen şifrenizi tekrar girin"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;