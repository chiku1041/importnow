import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ImportNow - Your Trusted Partner for Imports from China to India",
    template: "%s | ImportNow",
  },
  description:
    "ImportNow: Reliable partner for importing from China to India. End-to-end support for D2C brands, Amazon/Flipkart sellers, and professional importers. Transparent costs, reduced risks, time savings.",
  keywords: [
    "import from China to India",
    "China import partner",
    "product sourcing China",
    "quality inspection",
    "import logistics",
    "D2C brands import",
    "Amazon seller import",
    "Flipkart seller import",
  ],
  authors: [{ name: "ImportNow" }],
  creator: "ImportNow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://importnow.in",
    siteName: "ImportNow",
    title: "ImportNow - Your Trusted Partner for Imports from China to India",
    description:
      "End-to-end import support with transparent costs, reduced risks, and time savings. Partner with ImportNow for seamless China-India imports.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ImportNow - Seamless China to India Imports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ImportNow - Your Trusted Partner for Imports from China to India",
    description:
      "End-to-end import support with transparent costs, reduced risks, and time savings.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
