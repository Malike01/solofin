

import type { LoginFormValues, RegisterFormValues } from '@/schemas/authSchema';
import { api } from './api';
import type { UserResponse } from '@/types';

// Backend'den dönen yanıt tipleri
interface AuthResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  register: async (data: RegisterFormValues) => {
    const payload = {
      email: data.email,
      password: data.password,
      full_name: data.name,
    };
    const response = await api.post<UserResponse>('/auth/register', payload);
    return response.data;
  },

  login: async (data: LoginFormValues) => {
    const formData = new URLSearchParams();
    formData.append('username', data.email); 
    formData.append('password', data.password);

    const response = await api.post<AuthResponse>('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<UserResponse>('/users/me');
    return response.data;
  },

  getGoogleUrl: async () => {
    const response = await api.get('/auth/google');
    return response.request.responseURL; 
  }
};