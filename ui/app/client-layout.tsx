'use client';

import Navbar from "components/components/layout/navbar/Navbar";
import { ThemeProvider } from "components/components/providers/theme/ThemeProvider";
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="py-24 px-4 mx-auto container">{children}</main>
      <Toaster />
    </ThemeProvider>
  );
} 