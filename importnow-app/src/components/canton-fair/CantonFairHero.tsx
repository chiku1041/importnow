"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

const stats = [
    { value: "70+", label: "Years" },
    { value: "25,000+", label: "Factories" },
    { value: "3", label: "Phases" },
];

export function CantonFairHero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#1F3A5F] to-[#0B1F33]"></div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: "32px 32px",
                    }}
                />
            </div>

            <div className="container-custom relative z-10">
                <div
                    className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    {/* Badge */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
                            <span className="px-2 py-0.5 bg-[#C56A2D] text-white rounded-full text-xs font-bold">
                                LIVE
                            </span>
                            Canton Fair 2025
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-6">
                        <h1 className="font-black text-white leading-tight tracking-tight">
                            <span className="block text-4xl md:text-5xl lg:text-6xl">
                                Canton Fair is where global
                            </span>
                            <span className="block text-4xl md:text-5xl lg:text-6xl text-[#C56A2D]">
                                sourcing decisions are made.
                            </span>
                        </h1>

                        {/* Stats Row */}
                        <div className="flex items-center justify-center gap-6 md:gap-12 pt-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm md:text-base text-white/70">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                            <div className="text-left pl-4 md:pl-6 border-l border-white/30">
                                <div className="text-sm md:text-base text-white/90 max-w-[200px]">
                                    One opportunity to get it right.
                                </div>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            If you&apos;re sourcing from China, expanding your product line, or building a brand,
                            Canton Fair isn&apos;t optional. It&apos;s where the market shows up.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button
                            size="lg"
                            className="bg-[#C56A2D] hover:bg-[#B85A25] text-white font-semibold px-8 py-6 text-lg shadow-lg"
                            asChild
                        >
                            <Link href="/contact">Get Canton Fair Guidance</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
