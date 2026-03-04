"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const recapPoints = [
    "Canton Fair is the world's biggest sourcing event",
    "Right phase selection is critical",
    "First-timers need structure",
    "ImportNow helps you do this the right way",
];

export function QuickRecap() {
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
                <div
                    className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-8">
                        In Short
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        {recapPoints.map((point, index) => (
                            <div
                                key={index}
                                className={`inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-sm transition-all duration-500 ${isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="h-5 w-5 rounded-full bg-[#0B1F33] text-white flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3" />
                                </div>
                                <span className="text-sm font-medium text-[#1F2933]">
                                    {point}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
