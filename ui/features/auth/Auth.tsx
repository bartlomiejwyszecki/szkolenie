'use client';

import { AuthLayout } from './AuthLayout';
import { Login } from './login/Login';
import { Register } from './register/Register';

export const Auth = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}; 