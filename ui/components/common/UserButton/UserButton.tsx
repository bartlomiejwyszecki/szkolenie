'use client';

import { UserIcon } from "@heroicons/react/24/outline";

export const UserButton = () => {
  return (
    <button
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="User menu"
    >
      <UserIcon className="w-5 h-5" />
    </button>
  );
}; 