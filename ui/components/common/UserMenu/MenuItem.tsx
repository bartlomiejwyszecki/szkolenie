'use client';

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const MenuItem = ({ children, onClick }: MenuItemProps) => {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {children}
    </button>
  );
}; 