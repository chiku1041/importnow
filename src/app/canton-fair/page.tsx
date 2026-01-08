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
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";

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
        url: "https://importnow.in/canton-fair",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Canton Fair Guide for Indian Importers | ImportNow",
        description:
            "Your complete guide to attending Canton Fair. Phase selection, visa help, travel coordination, and on-ground support for Indian importers.",
    },
    alternates: {
        canonical: "https://importnow.in/canton-fair",
    },
};

export default function CantonFairPage() {
    const baseUrl = "https://importnow.in";
    const pageUrl = `${baseUrl}/canton-fair`;

    // Breadcrumb structured data
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: baseUrl },
        { name: "Canton Fair Guide", url: pageUrl },
    ]);

    // WebPage structured data
    const webPageSchema = generateWebPageSchema({
        name: "Canton Fair Guide for Indian Importers | ImportNow",
        description:
            "Your complete guide to attending Canton Fair. Phase selection, visa help, travel coordination, and on-ground support for Indian importers.",
        url: pageUrl,
        breadcrumb: [
            { name: "Home", url: baseUrl },
            { name: "Canton Fair Guide", url: pageUrl },
        ],
    });

    return (
        <>
            {/* Structured Data */}
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
