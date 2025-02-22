import toast from 'react-hot-toast';
import { TOAST_DEFAULT_OPTIONS, toastService } from './toastService';

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
  dismiss: jest.fn(),
}));

describe('toastService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('default options', () => {
    it('should have default duration of 3000', () => {
      expect(TOAST_DEFAULT_OPTIONS.duration).toBe(3000);
    });

    it('should have default position of bottom-center', () => {
      expect(TOAST_DEFAULT_OPTIONS.position).toBe('bottom-center');
    });
  });

  describe('success', () => {
    it('should call toast.success with proper message', () => {
      const message = 'Success message';
      
      toastService.success(message);

      expect(toast.success).toHaveBeenCalledWith(message, TOAST_DEFAULT_OPTIONS);
    });
  });

  describe('error', () => {
    it('should call toast.error with proper message', () => {
      const message = 'Error message';
      
      toastService.error(message);

      expect(toast.error).toHaveBeenCalledWith(message, TOAST_DEFAULT_OPTIONS);
    });
  });

  describe('loading', () => {
    it('should call toast.loading with proper message', () => {
      const message = 'Loading message';
      
      toastService.loading(message);

      expect(toast.loading).toHaveBeenCalledWith(message, TOAST_DEFAULT_OPTIONS);
    });
  });

  describe('dismiss', () => {
    it('should call toast.dismiss without id', () => {
      toastService.dismiss();
      expect(toast.dismiss).toHaveBeenCalledWith(undefined);
    });

    it('should call toast.dismiss with id', () => {
      const toastId = 'test-toast-id';
      toastService.dismiss(toastId);
      expect(toast.dismiss).toHaveBeenCalledWith(toastId);
    });
  });
}); 