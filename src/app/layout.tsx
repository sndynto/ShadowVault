import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShadowVault - Private Portfolio Tracker",
  description: "Track Your Wealth Without Revealing It - Powered by Fhenix FHE",
  keywords: ["crypto", "portfolio", "privacy", "fhenix", "fhe", "encrypted"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
