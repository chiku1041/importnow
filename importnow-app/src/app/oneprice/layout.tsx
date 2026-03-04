import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OnePrice - Simplified Import Service | ImportNow",
  description:
    "Import Simplified. One Price. Zero Hassle. Fixed per-kg rate for small shipments from China to India—no negotiations, no surprises, no middlemen. Just sign up, ship, and track.",
  keywords: [
    "OnePrice",
    "simplified import",
    "fixed price import",
    "small shipment import",
    "China to India import",
  ],
  openGraph: {
    title: "OnePrice - Simplified Import Service | ImportNow",
    description:
      "Import Simplified. One Price. Zero Hassle. Fixed per-kg rate for small shipments from China to India.",
    url: "https://importnow.in/oneprice",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnePrice - Simplified Import Service | ImportNow",
    description:
      "Import Simplified. One Price. Zero Hassle. Fixed per-kg rate for small shipments from China to India.",
  },
  alternates: {
    canonical: "https://importnow.in/oneprice",
  },
};

export default function OnePriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



