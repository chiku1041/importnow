"use client";

import { useState, useEffect, useRef } from "react";
import { Briefcase, TrendingUp, PackageSearch } from "lucide-react";

const cards = [
  {
    icon: PackageSearch,
    title: "New Product Searchers",
    description:
      "You're exploring new product lines and need to see real factories, real markets, and real suppliers—not just online catalogs.",
  },
  {
    icon: Briefcase,
    title: "Established Importers",
    description:
      "You've been importing for 1-3 years and want to deepen supplier relationships and discover new product categories.",
  },
  {
    icon: TrendingUp,
    title: "Scaling Businesses",
    description:
      "Your import volume is growing and you need to understand factory capabilities, quality standards, and negotiation strategies.",
  },
];

export function WhoThisTripIsFor() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observedRef = useRef(false);

  useEffect(() => {
    if (observedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !observedRef.current) {
            observedRef.current = true;
            // Stagger card animations
            [0, 1, 2].forEach((index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-24">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A] text-center mb-12">
          Who This Trip Is For
        </h2>
        <div
          ref={sectionRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isVisible = visibleCards.includes(index);
            return (
              <div
                key={index}
                className={`bg-white rounded-lg p-7 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="mb-5">
                  <Icon
                    size={28}
                    className="text-[#C53030]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-[20px] lg:text-[22px] font-medium text-[#0F172A] mb-3">
                  {card.title}
                </h3>
                <p className="text-[#334155] text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
