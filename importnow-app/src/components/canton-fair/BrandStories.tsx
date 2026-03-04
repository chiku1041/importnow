"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Home, Utensils, Briefcase } from "lucide-react";

const stories = [
    {
        icon: Home,
        category: "Home Appliances",
        title: "Found a long-term manufacturing partner",
        description:
            "A home appliances brand found its long-term manufacturing partner during its first Canton Fair visit. Today, they export to multiple markets.",
    },
    {
        icon: Utensils,
        category: "D2C Kitchenware",
        title: "Finalized exclusive molds in one meeting",
        description:
            "A D2C kitchenware startup finalized exclusive molds after a single supplier meeting. Their bestseller came from that booth.",
    },
    {
        icon: Briefcase,
        category: "Indian Importer",
        title: "Cut sourcing costs with direct negotiation",
        description:
            "An Indian importer cut sourcing costs by negotiating directly with factories instead of agents.",
    },
];

export function BrandStories() {
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
        <section ref={sectionRef} className="bg-[#0B1F33] section-padding">
            <div className="container-custom">
                <div
                    className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Where Brands Get Their{" "}
                        <span className="text-[#C56A2D]">Start</span>
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        This is common at Canton Fair. If you know where to look.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {stories.map((story, index) => (
                        <Card
                            key={index}
                            className={`bg-[#1F3A5F] border-[#1F3A5F] p-6 transition-all duration-700 hover:bg-[#2a4a73] ${isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="h-12 w-12 rounded-xl bg-[#0B1F33] flex items-center justify-center mb-4">
                                <story.icon className="h-6 w-6 text-[#C56A2D]" />
                            </div>
                            <div className="text-xs font-semibold text-[#C56A2D] uppercase tracking-wide mb-2">
                                {story.category}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                {story.title}
                            </h3>
                            <p className="text-sm text-white/70">{story.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
