import { Metadata } from "next";
import { CantonFairHero } from "@/components/canton-fair/CantonFairHero";
import { CredibilityStats } from "@/components/canton-fair/CredibilityStats";
import { WhatIsCantonFair } from "@/components/canton-fair/WhatIsCantonFair";
import { ExpandableSections } from "@/components/canton-fair/ExpandableSections";
import { BrandStories } from "@/components/canton-fair/BrandStories";
import { TheProblem } from "@/components/canton-fair/TheProblem";
import { ImportNowSolution } from "@/components/canton-fair/ImportNowSolution";
import { LeadMagnet } from "@/components/canton-fair/LeadMagnet";
import { QuickRecap } from "@/components/canton-fair/QuickRecap";
import { CantonFairCTA } from "@/components/canton-fair/CantonFairCTA";

export const metadata: Metadata = {
    title: "Canton Fair Guide for Indian Importers | ImportNow",
    description:
        "Your complete guide to attending Canton Fair. Phase selection, visa help, travel coordination, and on-ground support for Indian importers. Get Canton Fair guidance from ImportNow.",
    keywords: [
        "Canton Fair",
        "Canton Fair India",
        "Canton Fair guide",
        "China trade fair",
        "Canton Fair 2025",
        "Indian importers Canton Fair",
        "Guangzhou trade fair",
        "Canton Fair phases",
        "Canton Fair travel",
        "Canton Fair visa",
    ],
    openGraph: {
        title: "Canton Fair Guide for Indian Importers | ImportNow",
        description:
            "Your complete guide to attending Canton Fair. Phase selection, visa help, travel coordination, and on-ground support for Indian importers.",
        type: "website",
    },
};

export default function CantonFairPage() {
    return (
        <>
            <CantonFairHero />
            <CredibilityStats />
            <WhatIsCantonFair />
            <ExpandableSections />
            <BrandStories />
            <TheProblem />
            <ImportNowSolution />
            <LeadMagnet />
            <QuickRecap />
            <CantonFairCTA />
        </>
    );
}
