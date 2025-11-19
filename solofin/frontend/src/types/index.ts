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