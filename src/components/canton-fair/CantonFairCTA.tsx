"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function CantonFairCTA() {
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
        <section ref={sectionRef} className="bg-[#0B1F33] section-padding relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            <div className="container-custom relative">
                <div
                    className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Planning to Attend Canton Fair?
                    </h2>

                    <p className="text-xl text-white/90 mb-8">
                        Tell us what you&apos;re looking to source.
                        <br />
                        We&apos;ll tell you if Canton Fair is the right move for you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Button
                            size="lg"
                            className="bg-[#C56A2D] hover:bg-[#B85A25] text-white font-semibold shadow-lg"
                            asChild
                        >
                            <Link href="/contact" className="group">
                                Get Canton Fair Guidance
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>

                    {/* Secondary CTA */}
                    <div
                        className={`flex items-center justify-center gap-2 text-white/70 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">
                            Or{" "}
                            <Link
                                href="/contact"
                                className="text-[#C56A2D] hover:text-[#D97A3D] underline underline-offset-2"
                            >
                                get the Canton Fair Readiness Checklist
                            </Link>{" "}
                            before you book anything
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
