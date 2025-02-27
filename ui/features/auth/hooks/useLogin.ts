import { useState } from 'react';
import { authHttpService } from '../services/authHttpService';
import { LoginRequest } from '../models/auth-response.interface';

interface UseLoginReturn {
  login: (data: LoginRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      await authHttpService.login(data);
    } catch (err) {
      setError('Failed to log in. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
}; 