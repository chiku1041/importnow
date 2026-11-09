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
  generateServiceSchema,
} from "@/lib/structured-data";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export const metadata: Metadata = {
    title: "Canton Fair Guide for Indian Importers 2026 | ImportNow",
    description:
        "Complete guide to attending Canton Fair from India. Phase selection, visa help, travel coordination, and on-ground support in Guangzhou. Group trips available from ImportNow.",
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
        title: "Canton Fair Guide for Indian Importers 2026 | ImportNow",
        description:
            "Complete guide to attending Canton Fair from India. Phase selection, visa help, travel coordination, and on-ground support in Guangzhou. Group trips available from ImportNow.",
        url: "https://importnow.in/canton-fair",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Canton Fair Guide for Indian Importers 2026 | ImportNow",
        description:
            "Complete guide to attending Canton Fair from India. Phase selection, visa help, travel coordination, and on-ground support in Guangzhou. Group trips available from ImportNow.",
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
        { name: "Canton Fair", url: pageUrl },
    ]);

    // WebPage structured data
    const webPageSchema = generateWebPageSchema({
        name: "Canton Fair Guide for Indian Importers 2026 | ImportNow",
        description:
            "Complete guide to attending Canton Fair from India. Phase selection, visa help, travel coordination, and on-ground support in Guangzhou. Group trips available from ImportNow.",
        url: pageUrl,
        breadcrumb: [
            { name: "Home", url: baseUrl },
            { name: "Canton Fair Guide", url: pageUrl },
        ],
    });

    // Service structured data
    const serviceSchema = generateServiceSchema(
        "Canton Fair Guidance for Indian Importers",
        "Canton Fair attendance support including phase selection, visa help, travel coordination, and on-ground support in Guangzhou.",
        pageUrl,
        "ImportNow",
        "Trade Fair Guidance",
        "India"
    );

    // FAQPage structured data (from ExpandableSections FAQs)
    const faqPageSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "When does Canton Fair happen?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Canton Fair is held twice a year—Spring (April-May) and Autumn (October-November). Each edition has three phases lasting about 5 days each.",
                },
            },
            {
                "@type": "Question",
                name: "How much does it cost to attend?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Entry to Canton Fair is free for registered buyers. Your main costs are visa (~₹8,000), flights (₹25,000-45,000), and accommodation (₹5,000-15,000/night). With ImportNow, you can reduce these significantly.",
                },
            },
            {
                "@type": "Question",
                name: "Is it worth visiting as a first-timer?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely—but only with proper preparation. First-timers who go without guidance often feel overwhelmed. With the right phase selection and a plan, it can be transformational for your sourcing.",
                },
            },
            {
                "@type": "Question",
                name: "Can I place orders at the fair?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most exhibitors don't sell products directly at the fair. You'll collect samples, negotiate terms, and finalize orders after returning. The fair is for sourcing and relationship building.",
                },
            },
            {
                "@type": "Question",
                name: "How many days should I plan for?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "For one phase, plan at least 4-5 days (2-3 days at the fair + buffer for factory visits if needed). Many serious buyers combine the fair with factory visits in nearby cities.",
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
