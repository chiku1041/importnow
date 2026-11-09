import { Metadata } from "next";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
} from "@/lib/structured-data";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export const metadata: Metadata = {
  title: "OnePrice — Simple Per-KG Import Pricing from China to India | ImportNow",
  description:
    "Import from China with one fixed per-kg price. Customs, shipping, and delivery included. No hidden fees. Ideal for first-time importers, small resellers, and D2C brands.",
  openGraph: {
    title: "OnePrice — Simple Per-KG Import Pricing from China to India | ImportNow",
    description:
      "Import from China with one fixed per-kg price. Customs, shipping, and delivery included. No hidden fees. Ideal for first-time importers, small resellers, and D2C brands.",
    url: "https://importnow.in/oneprice",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnePrice — Simple Per-KG Import Pricing from China to India | ImportNow",
    description:
      "Import from China with one fixed per-kg price. Customs, shipping, and delivery included. No hidden fees. Ideal for first-time importers, small resellers, and D2C brands.",
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
  const baseUrl = "https://importnow.in";
  const pageUrl = `${baseUrl}/oneprice`;

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "OnePrice", url: pageUrl },
  ]);

  // WebPage structured data
  const webPageSchema = generateWebPageSchema({
    name: "OnePrice — Simple Per-KG Import Pricing from China to India | ImportNow",
    description:
      "Import from China with one fixed per-kg price. Customs, shipping, and delivery included. No hidden fees. Ideal for first-time importers, small resellers, and D2C brands.",
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: baseUrl },
      { name: "OnePrice", url: pageUrl },
    ],
  });

  // Service structured data
  const serviceSchema = generateServiceSchema(
    "OnePrice — Per-KG Import Pricing",
    "Fixed per-kg pricing for imports from China to India. Customs, shipping, and doorstep delivery included.",
    pageUrl,
    "ImportNow",
    "Import Shipping Service",
    "India"
  );

  // FAQPage structured data (from OnePrice page FAQs)
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is OnePrice for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "OnePrice is designed for first-time importers, small resellers, D2C brands testing products, and anyone making personal imports. It's perfect for those who want simplicity and predictability without the complexity of traditional freight forwarding.",
        },
      },
      {
        "@type": "Question",
        name: "What's included in the OnePrice rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your OnePrice per-kg rate includes everything: shipping from our warehouse to India, customs clearance at both origin and destination, and doorstep delivery. No hidden fees, no surprises.",
        },
      },
      {
        "@type": "Question",
        name: "What are the order limits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "OnePrice works best for shipments under 50 kg—perfect for samples and small volumes with no minimum order. For bulk orders over 50 kg or higher value shipments, please contact our team directly for customized solutions.",
        },
      },
      {
        "@type": "Question",
        name: "Which countries are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Currently, OnePrice supports imports from China to India. We're expanding soon to include Hong Kong, Canada, Malaysia, and Australia—you'll see all available options in your dashboard after signing up.",
        },
      },
      {
        "@type": "Question",
        name: "Do you handle product quality inspection?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "OnePrice is a logistics-only service—we handle shipping from our warehouse to your doorstep. Product quality and quantity verification is between you and your supplier. If you need quality inspection, consider our full ImportNow services.",
        },
      },
      {
        "@type": "Question",
        name: "How do I track my shipment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once your supplier ships to our warehouse and you enter the tracking number, you'll get real-time updates through your dashboard. Track every step: warehouse acceptance, dispatch, customs clearance, transit, local delivery, and final delivery with accurate ETAs.",
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <LocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema),
        }}
      />
      {children}
    </>
  );
}
