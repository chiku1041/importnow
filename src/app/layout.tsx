import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
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
  title: {
    default: "ImportNow - China to India Import Services",
    template: "%s | ImportNow",
  },
  description:
    "End-to-end China sourcing, quality control, and import execution for Indian businesses. Product sourcing, quality inspection, logistics, and customs clearance.",
  keywords: [
    "China to India import",
    "product sourcing",
    "import services",
    "quality inspection",
    "customs clearance",
    "freight forwarding",
  ],
  authors: [{ name: "ImportNow" }],
  creator: "ImportNow",
  publisher: "ImportNow",
  metadataBase: new URL("https://importnow.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://importnow.in",
    siteName: "ImportNow",
    title: "ImportNow - China to India Import Services",
    description:
      "End-to-end China sourcing, quality control, and import execution for Indian businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ImportNow - China to India Import Services",
    description:
      "End-to-end China sourcing, quality control, and import execution for Indian businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VE014C8LBS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VE014C8LBS');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Header />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
