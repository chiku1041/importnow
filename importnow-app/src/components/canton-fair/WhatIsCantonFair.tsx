"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, DollarSign, Package, Clock } from "lucide-react";

const highlights = [
    {
        icon: MessageSquare,
        text: "Talk pricing face to face",
    },
    {
        icon: Package,
        text: "Discuss customization & MOQs",
    },
    {
        icon: DollarSign,
        text: "Negotiate directly with factories",
    },
    {
        icon: Clock,
        text: "No email delays or intermediaries",
    },
];

export function WhatIsCantonFair() {
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
        <section ref={sectionRef} className="bg-[#F5F7FA] section-padding">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div
                        className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                            }`}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-6">
                            What Actually Happens at{" "}
                            <span className="text-[#0B1F33]">Canton Fair</span>
                        </h2>

                        <div className="space-y-4 text-lg text-[#666666]">
                            <p>
                                Factories don&apos;t just display products here. They test ideas, launch
                                new models, and meet serious buyers.
                            </p>
                            <p>
                                You talk pricing, customization, MOQs, packaging, and timelines face
                                to face. No intermediaries. No email delays.
                            </p>
                            <p className="text-[#C56A2D] font-medium">
                                That&apos;s also why first-time visitors feel lost.
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Highlights */}
                    <div
                        className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                            }`}
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-lg font-semibold text-[#1F2933] mb-6">
                                What You Can Do There
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {highlights.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-[#F5F7FA] transition-colors hover:bg-[#E8ECEF]"
                                    >
                                        <div className="h-10 w-10 rounded-lg bg-[#0B1F33] flex items-center justify-center shrink-0">
                                            <item.icon className="h-5 w-5 text-[#C56A2D]" />
                                        </div>
                                        <span className="text-sm font-medium text-[#1F2933]">
                                            {item.text}
                                        </span>
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
