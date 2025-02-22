import { useState } from 'react';
import { authHttpService } from '../services/authHttpService';
import { RegisterRequest } from '../models/register-request.interface';

interface UseRegisterReturn {
  register: (data: RegisterRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useRegister = (): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      await authHttpService.register(data);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
}; 