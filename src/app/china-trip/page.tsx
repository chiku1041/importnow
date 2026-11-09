import { Metadata } from "next";
import { ChinaTripHero } from "@/components/china-trip/ChinaTripHero";
import { WhoThisTripIsFor } from "@/components/china-trip/WhoThisTripIsFor";
import { WhyThisTripExists } from "@/components/china-trip/WhyThisTripExists";
import { YourGuideSection } from "@/components/china-trip/YourGuideSection";
import { DayByDayItinerary } from "@/components/china-trip/DayByDayItinerary";
import { WhatYouWillLearn } from "@/components/china-trip/WhatYouWillLearn";
import { ShenzhenElectronicsHub } from "@/components/china-trip/ShenzhenElectronicsHub";
import { WhatsIncluded } from "@/components/china-trip/WhatsIncluded";
import { GroupSizeUSP } from "@/components/china-trip/GroupSizeUSP";
import { FinalCTASection } from "@/components/china-trip/FinalCTASection";
import { Disclaimers } from "@/components/china-trip/Disclaimers";
import { MobileWhatsAppButton } from "@/components/china-trip/MobileWhatsAppButton";
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateServiceSchema,
} from "@/lib/structured-data";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export const metadata: Metadata = {
  title: "China Import Learning Trip | ImportNow",
  description:
    "Join a serious, practical learning trip to China for importers. Visit Canton Fair, Shenzhen electronics markets, and factories. Built for business, not tourism.",
  keywords: [
    "China import trip",
    "Canton Fair visit",
    "Shenzhen electronics market",
    "China sourcing trip",
    "import learning trip",
  ],
  openGraph: {
    title: "China Import Learning Trip | ImportNow",
    description:
      "Join a serious, practical learning trip to China for importers. Visit Canton Fair, Shenzhen electronics markets, and factories.",
    url: "https://importnow.in/china-trip",
    type: "website",
  },
  alternates: {
    canonical: "https://importnow.in/china-trip",
  },
};

export default function ChinaTripPage() {
  const baseUrl = "https://importnow.in";
  const pageUrl = `${baseUrl}/china-trip`;

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "China Trip", url: pageUrl },
  ]);

  // WebPage structured data
  const webPageSchema = generateWebPageSchema({
    name: "China Import Learning Trip | ImportNow",
    description:
      "Join a serious, practical learning trip to China for importers. Visit Canton Fair, Shenzhen electronics markets, and factories. Built for business, not tourism.",
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: baseUrl },
      { name: "China Trip", url: pageUrl },
    ],
  });

  // Service structured data
  const serviceSchema = generateServiceSchema(
    "China Import Learning Trip",
    "Hands-on learning trip to China for Indian importers. Factory visits, market tours, and sourcing education.",
    pageUrl,
    "ImportNow",
    "Import Learning Trip",
    "India"
  );

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
      <ChinaTripHero />
      <WhoThisTripIsFor />
      <WhyThisTripExists />
      <YourGuideSection />
      <DayByDayItinerary />
      <WhatYouWillLearn />
      <ShenzhenElectronicsHub />
      <WhatsIncluded />
      <GroupSizeUSP />
      <FinalCTASection />
      <Disclaimers />
      <MobileWhatsAppButton />
    </>
  );
}

