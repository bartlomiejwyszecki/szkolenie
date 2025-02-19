'use client';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-start py-8">
        {children}
      </div>
    </div>
  );
}; 