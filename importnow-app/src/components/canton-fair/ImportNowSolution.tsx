"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const solutions = [
    {
        title: "Phase Selection Based on Your Business",
        description:
            "We analyze your product requirements and recommend the right phase to attend.",
    },
    {
        title: "End-to-End Travel and Visa Coordination",
        description:
            "From visa application to hotel booking, we handle all logistics.",
    },
    {
        title: "Pre-Fair Preparation and Supplier Direction",
        description:
            "Know exactly which halls and booths to visit before you land.",
    },
    {
        title: "On-Ground Support During the Fair",
        description:
            "Our team is there with you for translation, navigation, and negotiation support.",
    },
    {
        title: "Factory Visits and Next Steps After",
        description:
            "We help you verify suppliers and plan post-fair factory visits.",
    },
];

export function ImportNowSolution() {
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
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Main Message */}
                        <div
                            className={`transition-all duration-700 ${isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-8"
                                }`}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
                                <Check className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium text-green-600">
                                    The Solution
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-6">
                                How <span className="text-[#0B1F33]">ImportNow</span> Helps
                            </h2>

                            <p className="text-lg text-[#666666] mb-6">
                                We help you attend Canton Fair with clarity.
                            </p>

                            <p className="text-lg font-semibold text-[#0B1F33]">
                                Our focus is simple.
                                <br />
                                <span className="text-[#C56A2D]">
                                    You come back with suppliers, not confusion.
                                </span>
                            </p>
                        </div>

                        {/* Right - Solutions List */}
                        <div
                            className={`transition-all duration-700 delay-200 ${isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-8"
                                }`}
                        >
                            <div className="space-y-4">
                                {solutions.map((solution, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 bg-[#F5F7FA] rounded-xl hover:bg-[#E8ECEF] transition-colors"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="h-8 w-8 rounded-full bg-[#0B1F33] text-white flex items-center justify-center shrink-0">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[#1F2933] mb-1">
                                                {solution.title}
                                            </h4>
                                            <p className="text-sm text-[#666666]">
                                                {solution.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
