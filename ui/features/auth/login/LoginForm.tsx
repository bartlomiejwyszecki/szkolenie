'use client';

import { useState } from 'react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      aria-label="Login form"
    >
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100"
          required
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg 
                 hover:bg-blue-700 transition-colors 
                 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Log in
      </button>
    </form>
  );
}; 