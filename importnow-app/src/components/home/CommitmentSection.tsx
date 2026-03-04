"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, Clock, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const benefits = [
  {
    icon: DollarSign,
    title: "Clear, Upfront Costs",
    description:
      "No hidden fees or surprise charges. We provide transparent pricing from day one so you can plan your budgets with confidence.",
  },
  {
    icon: Clock,
    title: "Less Time on Operations",
    description:
      "Focus on your core business while we handle supplier communications, logistics coordination, and customs procedures.",
  },
  {
    icon: Shield,
    title: "Lower Risks with Vetted Networks",
    description:
      "Our established relationships with 1000+ verified manufacturers means you're protected from fraud and quality issues.",
  },
];

export function CommitmentSection() {
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
        {/* Heading */}
        <div
          className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
            Our Commitment:{" "}
            <span className="text-[#0B1F33]">Making Imports Simple and Reliable</span>
          </h2>
        </div>

        {/* Description */}
        <div
          className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-lg text-[#666666]">
            Many importers lose time and money to fraud, unclear pricing, too many middlemen, and messy operations. ImportNow fixes this by offering clear, end to end support with full transparency so risks drop, time is saved, and cost surprises disappear.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              variant="default"
              className={`bg-white border border-[#E1E6ED] transition-all duration-700 relative overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Accent line on top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#C56A2D]" />
              <div className="flex flex-col items-center text-center pt-6">
                {/* Icon */}
                <div className="h-16 w-16 rounded-2xl bg-[#F5F7FA] flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                  <benefit.icon className="h-8 w-8 text-[#0B1F33]" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-[#1F2933] mb-3">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#666666]">{benefit.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


