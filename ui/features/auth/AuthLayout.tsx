'use client';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-8 justify-center items-center items-start py-8">
        {children}
      </div>
    </div>
  );
}; 