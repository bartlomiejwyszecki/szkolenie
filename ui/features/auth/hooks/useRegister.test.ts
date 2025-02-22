import { renderHook, act } from '@testing-library/react';
import { useRegister } from './useRegister';
import { authHttpService } from '../services/authHttpService';

jest.mock('../services/authHttpService', () => ({
  authHttpService: {
    register: jest.fn(),
  },
}));

describe('useRegister', () => {
  const mockRegisterData = {
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useRegister());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle successful registration', async () => {
    (authHttpService.register as jest.Mock).mockResolvedValueOnce(undefined);
    
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.register(mockRegisterData);
    });

    expect(authHttpService.register).toHaveBeenCalledWith(mockRegisterData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle registration error', async () => {
    const error = new Error('Registration failed');
    (authHttpService.register as jest.Mock).mockRejectedValueOnce(error);
    
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.register(mockRegisterData);
    });

    expect(authHttpService.register).toHaveBeenCalledWith(mockRegisterData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Registration failed. Please try again.');
  });

  it('should set loading state during registration', async () => {
    (authHttpService.register as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );
    
    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.register(mockRegisterData);
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await result.current.register(mockRegisterData);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should reset error state before new registration attempt', async () => {
    (authHttpService.register as jest.Mock).mockRejectedValueOnce(new Error('First error'));
    
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.register(mockRegisterData);
    });

    expect(result.current.error).toBe('Registration failed. Please try again.');

    (authHttpService.register as jest.Mock).mockResolvedValueOnce(undefined);

    await act(async () => {
      await result.current.register(mockRegisterData);
    });

    expect(result.current.error).toBeNull();
  });
}); 