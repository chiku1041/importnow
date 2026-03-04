import { HeroSection } from "@/components/home/HeroSection";
import { CommitmentSection } from "@/components/home/CommitmentSection";
import { WhyDifferentSection } from "@/components/home/WhyDifferentSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { OurServicesSection } from "@/components/home/OurServicesSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { GallerySection } from "@/components/home/GallerySection";
import { OnePriceSection } from "@/components/home/OnePriceSection";
import { CTASection } from "@/components/home/CTASection";
import { Metadata } from "next";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "ImportNow | End-to-End Import & Supply Chain Partner for Indian Businesses",
  description:
    "ImportNow supports startups, SMEs, and growing brands with sourcing, supply chain, customs clearance, and complete import execution into India.",
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
    title: "ImportNow | End-to-End Import & Supply Chain Partner for Indian Businesses",
    description:
      "ImportNow supports startups, SMEs, and growing brands with sourcing, supply chain, customs clearance, and complete import execution into India.",
    url: "https://importnow.in",
    siteName: "ImportNow",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ImportNow | End-to-End Import & Supply Chain Partner for Indian Businesses",
    description:
      "ImportNow supports startups, SMEs, and growing brands with sourcing, supply chain, customs clearance, and complete import execution into India.",
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
      "ImportNow supports startups, SMEs, and growing brands with sourcing, supply chain, customs clearance, and complete import execution into India.",
    contactPoint: {
      telephone: "+919989724320",
      contactType: "Customer Service",
      email: "info@importnow.in",
    },
    sameAs: [],
  });

  // Website structured data with SiteLinksSearchBox
  const websiteSchema = generateWebsiteSchema(baseUrl);

  return (
    <>
      {/* Structured Data */}
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

      <HeroSection
        subtitle="End-to-end China sourcing, quality control, and import execution for Indian businesses."
        ctaText="Get Free Quote"
        ctaHref="/contact"
        secondaryCtaText="Explore Services"
        secondaryCtaHref="/services"
      />
      <CommitmentSection />
      <WhyDifferentSection />
      <PartnersSection />
      <OurServicesSection />
      <ExperienceSection />
      <GallerySection />
      <OnePriceSection />
      <CTASection />
    </>
  );
}
