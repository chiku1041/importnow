"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Factory, Users, Building2 } from "lucide-react";

const stats = [
    {
        icon: Globe,
        value: "70+",
        label: "Years of Continuous Trade",
        description: "A legacy of global commerce",
    },
    {
        icon: Factory,
        value: "25,000+",
        label: "Exhibitors Every Edition",
        description: "Direct factory access",
    },
    {
        icon: Users,
        value: "200+",
        label: "Countries Represented",
        description: "Truly global participation",
    },
    {
        icon: Building2,
        value: "All",
        label: "Industries Covered",
        description: "Cross-sector opportunities",
    },
];

export function CredibilityStats() {
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
                        Why Canton Fair <span className="text-[#0B1F33]">Matters</span>
                    </h2>
                    <p className="text-lg text-[#666666] max-w-2xl mx-auto">
                        This isn&apos;t an exhibition. It&apos;s the supply chain in one place.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`text-center p-6 rounded-2xl bg-[#F5F7FA] transition-all duration-700 hover:shadow-lg ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="h-14 w-14 rounded-xl bg-[#0B1F33] flex items-center justify-center mx-auto mb-4">
                                <stat.icon className="h-7 w-7 text-[#C56A2D]" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-[#0B1F33] mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-[#1F2933] mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-[#666666]">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
