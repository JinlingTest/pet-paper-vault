import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PET Paper Vault",
  description: "A scalable PET/B1 vocabulary worksheet vault built with Next.js."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
