"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Check, ArrowRight } from "lucide-react";

const checklistItems = [
    "Which phase you should attend based on product",
    "Minimum prep timeline (visa, flights, registration)",
    "Questions to ask suppliers on Day 1",
    "Common red flags Indian buyers miss",
    "Post-fair next steps most people forget",
];

export function LeadMagnet() {
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
        <section ref={sectionRef} className="bg-[#C56A2D] section-padding">
            <div className="container-custom">
                <div
                    className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Left - Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C56A2D]/10 rounded-full mb-6">
                                    <FileText className="h-4 w-4 text-[#C56A2D]" />
                                    <span className="text-sm font-medium text-[#C56A2D]">
                                        Free Resource
                                    </span>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-4">
                                    Canton Fair Readiness Checklist
                                    <span className="block text-lg md:text-xl font-normal text-[#666666] mt-2">
                                        For Indian Importers
                                    </span>
                                </h2>

                                <p className="text-[#666666] mb-6">
                                    Don&apos;t book anything until you&apos;ve read this. Get clarity on
                                    exactly what you need before stepping into Canton Fair.
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {checklistItems.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="h-5 w-5 rounded-full bg-[#0B1F33] text-white flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="h-3 w-3" />
                                            </div>
                                            <span className="text-sm text-[#1F2933]">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right - CTA */}
                            <div className="bg-[#F5F7FA] rounded-2xl p-8 text-center">
                                <div className="h-20 w-20 bg-[#0B1F33] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <FileText className="h-10 w-10 text-[#C56A2D]" />
                                </div>

                                <h3 className="text-xl font-bold text-[#1F2933] mb-3">
                                    Get the Checklist
                                </h3>

                                <p className="text-sm text-[#666666] mb-6">
                                    Before you book anything
                                </p>

                                <Button
                                    size="lg"
                                    className="w-full bg-[#0B1F33] hover:bg-[#081620] text-white font-semibold"
                                    asChild
                                >
                                    <Link href="/contact" className="group">
                                        Get Free Checklist
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>

                                <p className="text-xs text-[#666666] mt-4">
                                    We&apos;ll send it via WhatsApp or email—your choice.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
