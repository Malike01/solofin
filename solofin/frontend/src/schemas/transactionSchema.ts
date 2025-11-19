import { z } from 'zod';
import { TransactionType } from '@/types';

export const transactionSchema = z.object({
  amount: z
    .number({ error: "Lütfen sayı giriniz" })
    .positive("Tutar 0'dan büyük olmalıdır")
    .min(1, "Tutar en az 1 olmalıdır"),
  
  type: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: "Lütfen geçerli bir işlem tipi seçin" }),
  }),
  
  category: z
    .string()
    .min(2, "Kategori en az 2 karakter olmalıdır")
    .max(50, "Kategori çok uzun"),
  
  description: z.string().optional(),
  
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Geçerli bir tarih giriniz",
  }),
  
  vat_rate: z.coerce.number().min(0).max(100).default(0), // KDV oranı (0-100 arası)
  is_tax_deductible: z.boolean().default(true),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;