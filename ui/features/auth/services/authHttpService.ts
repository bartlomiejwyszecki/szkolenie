import { httpService } from 'services/httpService';
import { AuthResponse } from '../models/auth-response.interface';
import { LoginRequest } from '../models/login-request.interface';
import { RegisterRequest } from '../models/register-request.interface';

const AUTH_BASE_URL = '/api/auth';

export const authHttpService = {
  async register(data: RegisterRequest): Promise<void> {
    return httpService.post<void>(`${AUTH_BASE_URL}/register`, data);
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    return httpService.post<AuthResponse>(`${AUTH_BASE_URL}/login`, data);
  },
}; 