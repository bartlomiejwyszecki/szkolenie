'use client';

import { UserMenuItems } from './UserMenuItems';

interface UserMenuProps {
  isOpen: boolean;
}

export const UserMenu = ({ isOpen }: UserMenuProps) => {
  if (!isOpen) return null;

  return (
    <div 
      role="menu"
      className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
    >
      <UserMenuItems />
    </div>
  );
}; 