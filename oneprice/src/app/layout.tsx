import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { SessionTimeoutHandler } from "@/components/session-timeout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Price (Buy Import Now) - Import Shipment Tracking",
  description: "Self-fulfilling import shipment tracking platform for first-time importers, small resellers, D2C brands, and personal imports. Track your packages from warehouse to doorstep.",
  keywords: ["import", "shipping", "tracking", "logistics", "warehouse", "delivery"],
  authors: [{ name: "One Price" }],
  openGraph: {
    title: "One Price (Buy Import Now)",
    description: "Import shipment tracking made simple",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SessionTimeoutHandler />
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
