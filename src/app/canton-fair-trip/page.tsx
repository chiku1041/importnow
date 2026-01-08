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
  return (
    <>
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

