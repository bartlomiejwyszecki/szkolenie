import toast, { ToastPosition } from 'react-hot-toast';

export type ToastType = 'success' | 'error' | 'loading';

interface ToastOptions {
  duration?: number;
  position?: ToastPosition;
}

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: 'bottom-center',
};

export const toastService = {
  success(message: string, options = defaultOptions) {
    return toast.success(message, {
      duration: options.duration,
      position: options.position,
    });
  },

  error(message: string, options = defaultOptions) {
    return toast.error(message, {
      duration: options.duration,
      position: options.position,
    });
  },

  loading(message: string, options = defaultOptions) {
    return toast.loading(message, {
      duration: options.duration,
      position: options.position,
    });
  },

  dismiss(toastId?: string) {
    toast.dismiss(toastId);
  },
}; 