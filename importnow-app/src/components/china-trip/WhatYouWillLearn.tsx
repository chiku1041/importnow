"use client";

import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

const learnings = [
  "How to identify quality factories vs. trading companies",
  "Factory negotiation strategies that actually work",
  "Quality control checkpoints throughout production",
  "MOQ negotiation and payment term structures",
  "How to read factory certifications and audit reports",
  "Product sampling and prototype development processes",
  "Logistics coordination from factory to port",
  "Customs documentation requirements",
  "Price negotiation beyond just unit cost",
  "Building long-term supplier relationships",
  "Identifying red flags in supplier communications",
  "Scaling production as your business grows",
];

export function WhatYouWillLearn() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-32">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="max-w-4xl mx-auto">
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A] text-center mb-12">
            What You Will Learn
          </h2>
          <div
            className={`grid sm:grid-cols-2 gap-x-8 gap-y-4 transition-all duration-300 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {learnings.map((learning, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check
                  size={18}
                  className="text-[#C53030] mt-0.5 flex-shrink-0"
                  strokeWidth={2.5}
                />
                <p className="text-[#334155] text-[15px] lg:text-base leading-relaxed">
                  {learning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
