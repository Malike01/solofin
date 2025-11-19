export interface User {
  id: number;
  email: string;
  full_name: string;
  is_google_user: boolean;
  login_attempts: number;
}

export interface UserResponse {
  id: number;
  email: string;
  full_name: string;
  is_google_user: boolean;
  login_attempts: number;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
export interface TransactionCreate {
  amount: number;
  type: TransactionType;
  category: string;
  description?: string;
  date?: string; 
  vat_rate?: number;
  is_tax_deductible?: boolean;
}

export interface TransactionResponse {
  id: number;
  owner_id: number;
  amount: number;
  type: TransactionType;
  category: string;
  description: string | null;
  date: string;
  vat_rate: number;
  is_tax_deductible: boolean;
  created_at: string;
}