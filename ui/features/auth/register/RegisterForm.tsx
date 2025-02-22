'use client';

import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const { register, isLoading, error } = useRegister();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordMismatch(false);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    await register({ email, password });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      aria-label="Register form"
    >
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <div>
        <label htmlFor="register-email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="register-password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="register-confirm-password" className="block text-sm font-medium mb-2">
          Confirm Password
        </label>
        <input
          id="register-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isLoading}
        />
        {passwordMismatch && (
          <div className="text-red-500 text-sm">Passwords are not the same</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}; 