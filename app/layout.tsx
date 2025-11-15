import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Force dynamic rendering for the app to avoid static prerendering
// which calls server APIs / DB during `next build`.
export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Smart Police Analytics",
  description: "AI-powered analytics dashboard for police good work recognition."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#0b1220]">
      <body className={`${inter.variable} antialiased bg-[#0b1220] text-slate-100`}>
        {children}
      </body>
    </html>
  );
}


