'use client';

interface UserMenuProps {
  isOpen: boolean;
}

export const UserMenu = ({ isOpen }: UserMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
      <a 
        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Login or Sign up
      </a>
    </div>
  );
}; 