import { httpService } from 'services/httpService';
import { LoginRequest } from '../models/login-request.interface';
import { RegisterRequest } from '../models/register-request.interface';
import { AuthResponse } from '../models/auth-response.interface';
import { authHttpService } from './authHttpService';

jest.mock('services/httpService', () => ({
  httpService: {
    post: jest.fn(),
  },
}));

describe('authHttpService', () => {
  const mockRegisterData: RegisterRequest = {
    email: 'test@example.com',
    password: 'password123',
  };

  const mockLoginData: LoginRequest = {
    email: 'test@example.com',
    password: 'password123',
  };

  const mockAuthResponse: AuthResponse = {
    token: 'mock-jwt-token',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should call httpService.post with correct parameters', async () => {
      (httpService.post as jest.Mock).mockResolvedValueOnce(undefined);

      await authHttpService.register(mockRegisterData);
      
      expect(httpService.post).toHaveBeenCalledWith('/api/auth/register', mockRegisterData);
      expect(httpService.post).toHaveBeenCalledTimes(1);
    });

    it('should throw error when registration fails', async () => {
      const error = new Error('Registration failed');

      (httpService.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(authHttpService.register(mockRegisterData))
        .rejects
        .toThrow('Registration failed');
    });
  });

  describe('login', () => {
    it('should call httpService.post with correct parameters', async () => {
      (httpService.post as jest.Mock).mockResolvedValueOnce(mockAuthResponse);

      const response = await authHttpService.login(mockLoginData);

      expect(httpService.post).toHaveBeenCalledWith('/api/auth/login', mockLoginData);
      expect(httpService.post).toHaveBeenCalledTimes(1);
      expect(response).toEqual(mockAuthResponse);
    });

    it('should throw error when login fails', async () => {
      const error = new Error('Login failed');

      (httpService.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(authHttpService.login(mockLoginData))
        .rejects
        .toThrow('Login failed');
    });
  });
}); 