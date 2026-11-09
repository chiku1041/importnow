import { Metadata } from "next";
import { ChinaTripHero } from "@/components/china-trip/ChinaTripHero";
import { WhoThisTripIsFor } from "@/components/china-trip/WhoThisTripIsFor";
import { WhyThisTripExists } from "@/components/china-trip/WhyThisTripExists";
import { YourGuideSection } from "@/components/china-trip/YourGuideSection";
import { UnbeatableValue } from "@/components/china-trip/UnbeatableValue";
import { WhatYouWillLearn } from "@/components/china-trip/WhatYouWillLearn";
import { ShenzhenElectronicsHub } from "@/components/china-trip/ShenzhenElectronicsHub";
import { WhatsIncludedCanton } from "@/components/china-trip/WhatsIncludedCanton";
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
  title: "Canton Fair Import Learning Trip | ImportNow",
  description:
    "Join a serious, practical learning trip to China for importers. Visit Canton Fair, Shenzhen electronics markets, and factories. Built for business, not tourism.",
  keywords: [
    "Canton Fair trip",
    "China import trip",
    "Canton Fair visit",
    "Shenzhen electronics market",
    "China sourcing trip",
    "import learning trip",
  ],
  openGraph: {
    title: "Canton Fair Import Learning Trip | ImportNow",
    description:
      "Join a serious, practical learning trip to China for importers. Visit Canton Fair, Shenzhen electronics markets, and factories.",
    url: "https://importnow.in/canton-fair-trip",
    type: "website",
  },
  alternates: {
    canonical: "https://importnow.in/canton-fair-trip",
  },
};

export default function CantonFairTripPage() {
  const whatsappLink = "https://wa.me/919989724320?text=Interested%20in%20the%20Canton%20Fair";
  const baseUrl = "https://importnow.in";
  const pageUrl = `${baseUrl}/canton-fair-trip`;

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Canton Fair Trip", url: pageUrl },
  ]);

  // WebPage structured data
  const webPageSchema = generateWebPageSchema({
    name: "Canton Fair Import Learning Trip | ImportNow",
    description:
      "Join a serious, practical learning trip to China for importers. Visit Canton Fair, Shenzhen electronics markets, and factories. Built for business, not tourism.",
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: baseUrl },
      { name: "Canton Fair Trip", url: pageUrl },
    ],
  });

  // Service structured data
  const serviceSchema = generateServiceSchema(
    "Canton Fair Import Learning Trip",
    "Guided trip to Canton Fair with factory visits, Shenzhen electronics market tour, and sourcing support.",
    pageUrl,
    "ImportNow",
    "Trade Fair Trip",
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
      <ChinaTripHero whatsappLink={whatsappLink} />
      <WhoThisTripIsFor />
      <WhyThisTripExists />
      <YourGuideSection />
      <UnbeatableValue />
      <WhatsIncludedCanton />
      <WhatYouWillLearn />
      <ShenzhenElectronicsHub />
      <GroupSizeUSP />
      <FinalCTASection whatsappLink={whatsappLink} />
      <Disclaimers />
      <MobileWhatsAppButton whatsappLink={whatsappLink} />
    </>
  );
}


