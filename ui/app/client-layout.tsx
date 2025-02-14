'use client';

import Navbar from "components/components/layout/navbar/Navbar";
import { ThemeProvider } from "components/components/providers/theme/ThemeProvider";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="py-24 mx-auto container">{children}</main>
    </ThemeProvider>
  );
} 