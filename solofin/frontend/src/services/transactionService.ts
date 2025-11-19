import type { TransactionCreate, TransactionResponse } from "@/types";
import { api } from "./api";

export const transactionService = {
  create: async (data: TransactionCreate): Promise<TransactionResponse> => {
    const response = await api.post<TransactionResponse>('/transactions/', data);
    return response.data;
  },

  getAll: async (skip = 0, limit = 100): Promise<TransactionResponse[]> => {
    const response = await api.get<TransactionResponse[]>('/transactions/', {
      params: { skip, limit },
    });
    return response.data;
  },
};