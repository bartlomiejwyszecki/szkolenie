'use client';

import { APP_CONFIG } from 'components/config/app';
import { LoginForm } from './LoginForm';

export const Login = () => {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Login to {APP_CONFIG.name}
      </h1>
      <LoginForm />
    </div>
  );
}; 