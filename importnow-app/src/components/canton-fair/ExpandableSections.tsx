"use client";

import { useEffect, useRef, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import {
    Calendar,
    Plane,
    AlertTriangle,
    DollarSign,
    HelpCircle,
} from "lucide-react";

const sections = [
    {
        id: "phases",
        icon: Calendar,
        title: "Three Phases. Three Very Different Audiences.",
        subtitle: "Choosing the wrong phase costs you time and money.",
        content: (
            <div className="space-y-6">
                <div className="bg-[#F5F7FA] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#0B1F33] text-white text-xs font-bold rounded-full">
                            PHASE 1
                        </span>
                        <span className="text-sm text-[#666666]">Mid-April</span>
                    </div>
                    <h4 className="font-semibold text-[#1F2933] mb-2">
                        Electronics, Vehicles, Machinery, Hardware
                    </h4>
                    <p className="text-sm text-[#666666]">
                        Electronics & household electrical appliances, lighting equipment, vehicles
                        & spare parts, machinery, hardware & tools, building materials, chemical
                        products, and energy resources.
                    </p>
                </div>

                <div className="bg-[#F5F7FA] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#1F3A5F] text-white text-xs font-bold rounded-full">
                            PHASE 2
                        </span>
                        <span className="text-sm text-[#666666]">Late April</span>
                    </div>
                    <h4 className="font-semibold text-[#1F2933] mb-2">
                        Consumer Goods, Decorations, Gifts
                    </h4>
                    <p className="text-sm text-[#666666]">
                        Consumer goods, home decorations, gifts & premiums, home textiles,
                        kitchenware, ceramics, glassware, toys, sporting goods, garden products,
                        and pet supplies.
                    </p>
                </div>

                <div className="bg-[#F5F7FA] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#C56A2D] text-white text-xs font-bold rounded-full">
                            PHASE 3
                        </span>
                        <span className="text-sm text-[#666666]">Early May</span>
                    </div>
                    <h4 className="font-semibold text-[#1F2933] mb-2">
                        Textiles, Garments, Health Products
                    </h4>
                    <p className="text-sm text-[#666666]">
                        Textiles & garments, shoes, bags, cases, fashion accessories,
                        office supplies, health & recreation products, food & beverages,
                        and medical devices.
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: "how-to-attend",
        icon: Plane,
        title: "How Indian Visitors Attend",
        subtitle: "Visa, travel, and logistics simplified.",
        content: (
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-[#F5F7FA] rounded-xl p-5">
                        <h4 className="font-semibold text-[#0B1F33] mb-3 flex items-center gap-2">
                            <span className="h-6 w-6 bg-[#0B1F33] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                1
                            </span>
                            China Visa
                        </h4>
                        <ul className="space-y-2 text-sm text-[#666666]">
                            <li>• Apply for a China business visa (M visa)</li>
                            <li>• Processing takes 4-7 working days</li>
                            <li>• Valid passport with 6+ months validity</li>
                            <li>• Invitation letter from Canton Fair or agent</li>
                        </ul>
                    </div>

                    <div className="bg-[#F5F7FA] rounded-xl p-5">
                        <h4 className="font-semibold text-[#0B1F33] mb-3 flex items-center gap-2">
                            <span className="h-6 w-6 bg-[#0B1F33] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                2
                            </span>
                            Flights
                        </h4>
                        <ul className="space-y-2 text-sm text-[#666666]">
                            <li>• Direct flights: Delhi/Mumbai to Guangzhou</li>
                            <li>• Book 4-6 weeks in advance for best rates</li>
                            <li>• Baiyun International Airport (CAN)</li>
                            <li>• Flight duration: ~5-6 hours</li>
                        </ul>
                    </div>

                    <div className="bg-[#F5F7FA] rounded-xl p-5">
                        <h4 className="font-semibold text-[#0B1F33] mb-3 flex items-center gap-2">
                            <span className="h-6 w-6 bg-[#0B1F33] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                3
                            </span>
                            Accommodation
                        </h4>
                        <ul className="space-y-2 text-sm text-[#666666]">
                            <li>• Stay near Pazhou Complex (fair venue)</li>
                            <li>• Hotels fill up quickly—book early</li>
                            <li>• Metro Line 8 connects to the venue</li>
                            <li>• Budget: ₹5,000-15,000/night</li>
                        </ul>
                    </div>

                    <div className="bg-[#F5F7FA] rounded-xl p-5">
                        <h4 className="font-semibold text-[#0B1F33] mb-3 flex items-center gap-2">
                            <span className="h-6 w-6 bg-[#0B1F33] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                4
                            </span>
                            Registration
                        </h4>
                        <ul className="space-y-2 text-sm text-[#666666]">
                            <li>• Pre-register online at cantonfair.org.cn</li>
                            <li>• Bring business cards (100+ recommended)</li>
                            <li>• Wear comfortable shoes—lots of walking</li>
                            <li>• Carry a power bank and notepad</li>
                        </ul>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "what-goes-wrong",
        icon: AlertTriangle,
        title: "What Usually Goes Wrong",
        subtitle: "Canton Fair doesn't fail people. Poor planning does.",
        content: (
            <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="h-8 w-8 bg-red-500 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
                        ✗
                    </div>
                    <div>
                        <h4 className="font-semibold text-[#1F2933] mb-1">
                            Attending the Wrong Phase
                        </h4>
                        <p className="text-sm text-[#666666]">
                            Each phase covers completely different product categories. Showing up
                            to Phase 1 when you need textiles means wasting your entire trip.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="h-8 w-8 bg-red-500 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
                        ✗
                    </div>
                    <div>
                        <h4 className="font-semibold text-[#1F2933] mb-1">
                            Speaking to Traders, Not Factories
                        </h4>
                        <p className="text-sm text-[#666666]">
                            Many booths are run by trading companies, not manufacturers. Without
                            knowing how to identify direct factories, you'll overpay.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="h-8 w-8 bg-red-500 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
                        ✗
                    </div>
                    <div>
                        <h4 className="font-semibold text-[#1F2933] mb-1">
                            Overpaying for Travel and Stay
                        </h4>
                        <p className="text-sm text-[#666666]">
                            Without group bookings or local knowledge, first-timers often pay
                            40-60% more for flights and hotels during fair season.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="h-8 w-8 bg-red-500 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
                        ✗
                    </div>
                    <div>
                        <h4 className="font-semibold text-[#1F2933] mb-1">
                            Collecting Samples with No Clear Next Steps
                        </h4>
                        <p className="text-sm text-[#666666]">
                            Many visitors return home with bags of samples but no follow-up plan,
                            no verified contacts, and no way to compare suppliers.
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "affordability",
        icon: DollarSign,
        title: "How ImportNow Makes It Affordable",
        subtitle: "We reduce costs by planning properly.",
        content: (
            <div className="space-y-6">
                <p className="text-[#666666]">
                    You don&apos;t pay for noise. You pay for direction.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                        <div className="h-8 w-8 bg-green-500 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
                            ✓
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#1F2933] mb-1">
                                Group Travel Efficiencies
                            </h4>
                            <p className="text-sm text-[#666666]">
                                Travel with other Indian importers for better rates on flights,
                                hotels, and local transport.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                        <div className="h-8 w-8 bg-green-500 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
                            ✓
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#1F2933] mb-1">
                                Negotiated Hotel Rates
                            </h4>
                            <p className="text-sm text-[#666666]">
                                We have tie-ups with hotels near the venue, saving you 30-40%
                                compared to booking directly.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                        <div className="h-8 w-8 bg-green-500 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
                            ✓
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#1F2933] mb-1">
                                No Unnecessary Add-ons
                            </h4>
                            <p className="text-sm text-[#666666]">
                                We don&apos;t bundle services you don&apos;t need. Choose what
                                matters for your trip.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                        <div className="h-8 w-8 bg-green-500 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
                            ✓
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#1F2933] mb-1">
                                No Supplier Commissions
                            </h4>
                            <p className="text-sm text-[#666666]">
                                We don&apos;t take cuts from suppliers. Our interests are aligned
                                purely with yours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "faqs",
        icon: HelpCircle,
        title: "Frequently Asked Questions",
        subtitle: "Common questions about Canton Fair.",
        content: (
            <div className="space-y-4">
                <div className="bg-[#F5F7FA] rounded-xl p-5">
                    <h4 className="font-semibold text-[#1F2933] mb-2">
                        When does Canton Fair happen?
                    </h4>
                    <p className="text-sm text-[#666666]">
                        Canton Fair is held twice a year—Spring (April-May) and Autumn
                        (October-November). Each edition has three phases lasting about 5 days each.
                    </p>
                </div>

                <div className="bg-[#F5F7FA] rounded-xl p-5">
                    <h4 className="font-semibold text-[#1F2933] mb-2">
                        How much does it cost to attend?
                    </h4>
                    <p className="text-sm text-[#666666]">
                        Entry to Canton Fair is free for registered buyers. Your main costs are
                        visa (~₹8,000), flights (₹25,000-45,000), and accommodation (₹5,000-15,000/night).
                        With ImportNow, you can reduce these significantly.
                    </p>
                </div>

                <div className="bg-[#F5F7FA] rounded-xl p-5">
                    <h4 className="font-semibold text-[#1F2933] mb-2">
                        Is it worth visiting as a first-timer?
                    </h4>
                    <p className="text-sm text-[#666666]">
                        Absolutely—but only with proper preparation. First-timers who go without
                        guidance often feel overwhelmed. With the right phase selection and a
                        plan, it can be transformational for your sourcing.
                    </p>
                </div>

                <div className="bg-[#F5F7FA] rounded-xl p-5">
                    <h4 className="font-semibold text-[#1F2933] mb-2">
                        Can I place orders at the fair?
                    </h4>
                    <p className="text-sm text-[#666666]">
                        Most exhibitors don&apos;t sell products directly at the fair. You&apos;ll
                        collect samples, negotiate terms, and finalize orders after returning.
                        The fair is for sourcing and relationship building.
                    </p>
                </div>

                <div className="bg-[#F5F7FA] rounded-xl p-5">
                    <h4 className="font-semibold text-[#1F2933] mb-2">
                        How many days should I plan for?
                    </h4>
                    <p className="text-sm text-[#666666]">
                        For one phase, plan at least 4-5 days (2-3 days at the fair + buffer for
                        factory visits if needed). Many serious buyers combine the fair with
                        factory visits in nearby cities.
                    </p>
                </div>
            </div>
        ),
    },
];

export function ExpandableSections() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white section-padding">
            <div className="container-custom">
                <div
                    className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
                        Everything You Need to{" "}
                        <span className="text-[#0B1F33]">Know</span>
                    </h2>
                    <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                        Click to expand each section and dive deeper into the details.
                    </p>
                </div>

                <div
                    className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    <Accordion type="single" className="space-y-4">
                        {sections.map((section) => (
                            <AccordionItem key={section.id} value={section.id}>
                                <AccordionTrigger value={section.id}>
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-[#F5F7FA] flex items-center justify-center shrink-0">
                                            <section.icon className="h-5 w-5 text-[#0B1F33]" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-[#1F2933]">
                                                {section.title}
                                            </div>
                                            <div className="text-sm text-[#666666] font-normal">
                                                {section.subtitle}
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent value={section.id}>
                                    {section.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
