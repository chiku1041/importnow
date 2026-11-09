import { HeroSection } from "@/components/home/HeroSection";
import { CommitmentSection } from "@/components/home/CommitmentSection";
import { HyderabadSection } from "@/components/home/HyderabadSection";
import { WhyDifferentSection } from "@/components/home/WhyDifferentSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { OurServicesSection } from "@/components/home/OurServicesSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { GallerySection } from "@/components/home/GallerySection";
import { OnePriceSection } from "@/components/home/OnePriceSection";
import { ContactInfoSection } from "@/components/home/ContactInfoSection";
import { CTASection } from "@/components/home/CTASection";
import { Metadata } from "next";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateServiceSchema,
} from "@/lib/structured-data";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export const metadata: Metadata = {
  title: "ImportNow | Import Export Consultant in Hyderabad — China to India Imports",
  description:
    "ImportNow is a Hyderabad-based import export consultant helping Indian businesses source products from China. Product sourcing, quality inspection, customs clearance, logistics, and brand building.",
  keywords: [
    "China to India import",
    "product sourcing China",
    "import services India",
    "China sourcing agent",
    "quality inspection",
    "customs clearance India",
    "freight forwarding",
    "China import logistics",
    "supply chain partner",
    "import execution India",
  ],
  openGraph: {
    title: "ImportNow | Import Export Consultant in Hyderabad — China to India Imports",
    description:
      "ImportNow is a Hyderabad-based import export consultant helping Indian businesses source products from China. Product sourcing, quality inspection, customs clearance, logistics, and brand building.",
    url: "https://importnow.in",
    siteName: "ImportNow",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ImportNow | Import Export Consultant in Hyderabad — China to India Imports",
    description:
      "ImportNow is a Hyderabad-based import export consultant helping Indian businesses source products from China. Product sourcing, quality inspection, customs clearance, logistics, and brand building.",
  },
  alternates: {
    canonical: "https://importnow.in",
  },
};

export default function HomePage() {
  const baseUrl = "https://importnow.in";

  // Organization structured data
  const organizationSchema = generateOrganizationSchema({
    name: "ImportNow",
    url: baseUrl,
    description:
      "ImportNow is a Hyderabad-based import export consultant helping Indian businesses source products from China. Product sourcing, quality inspection, customs clearance, logistics, and brand building.",
    contactPoint: {
      telephone: "+919989724320",
      contactType: "Customer Service",
      email: "hello@Importnow.in",
    },
    sameAs: [],
  });

  // Website structured data with SiteLinksSearchBox
  const websiteSchema = generateWebsiteSchema(baseUrl);

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
  ]);

  // WebPage structured data
  const webPageSchema = generateWebPageSchema({
    name: "ImportNow | Import Export Consultant in Hyderabad — China to India Imports",
    description:
      "ImportNow is a Hyderabad-based import export consultant helping Indian businesses source products from China. Product sourcing, quality inspection, customs clearance, logistics, and brand building.",
    url: baseUrl,
    breadcrumb: [{ name: "Home", url: baseUrl }],
  });

  // Service structured data
  const serviceSchema = generateServiceSchema(
    "China to India Import Consulting",
    "End-to-end import consulting from China to India including product sourcing, quality inspection, customs clearance, and logistics.",
    baseUrl,
    "ImportNow",
    "Import Export Consulting",
    "India"
  );

  return (
    <>
      {/* Structured Data */}
      <LocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
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

      <HeroSection
        subtitle="ImportNow works as your import consultant and execution partner. End-to-end China sourcing, quality control, and import execution for Indian businesses."
        ctaText="Get Free Quote"
        ctaHref="/contact"
        secondaryCtaText="Explore Services"
        secondaryCtaHref="/services"
      />
      <CommitmentSection />
      <HyderabadSection />
      <WhyDifferentSection />
      <PartnersSection />
      <OurServicesSection />
      <ExperienceSection />
      <GallerySection />
      <OnePriceSection />
      <ContactInfoSection />
      <CTASection />
    </>
  );
}
