import toast, { ToastPosition } from 'react-hot-toast';

export type ToastType = 'success' | 'error' | 'loading';

interface ToastOptions {
  duration?: number;
  position?: ToastPosition;
}

export const TOAST_DEFAULT_OPTIONS: ToastOptions = {
  duration: 3000,
  position: 'bottom-center',
};

export const toastService = {
  success(message: string, options = TOAST_DEFAULT_OPTIONS) {
    return toast.success(message, {
      duration: options.duration,
      position: options.position,
    });
  },

  error(message: string, options = TOAST_DEFAULT_OPTIONS) {
    return toast.error(message, {
      duration: options.duration,
      position: options.position,
    });
  },

  loading(message: string, options = TOAST_DEFAULT_OPTIONS) {
    return toast.loading(message, {
      duration: options.duration,
      position: options.position,
    });
  },

  dismiss(toastId?: string) {
    toast.dismiss(toastId);
  },
}; 