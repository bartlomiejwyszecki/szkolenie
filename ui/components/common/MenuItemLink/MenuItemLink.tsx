'use client';

import Link from 'next/link';

interface MenuItemLinkProps {
  children: React.ReactNode;
  href: string;
}

export const MenuItemLink = ({ children, href }: MenuItemLinkProps) => {
  return (
    <Link 
      href={href}
      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {children}
    </Link>
  );
}; 