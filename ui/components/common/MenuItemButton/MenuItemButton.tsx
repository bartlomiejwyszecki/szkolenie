'use client';

interface MenuItemButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const MenuItemButton = ({ children, onClick }: MenuItemButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {children}
    </button>
  );
}; 