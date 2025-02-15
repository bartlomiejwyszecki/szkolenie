import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Your App Name",
  description: "A more meaningful description of your application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased bg-background text-text-primary`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}