"use client";

import { useEffect, useRef, useState } from "react";

// Fictional partner logos represented as styled text
const partners = [
  { name: "TechSource", accent: "Tech" },
  { name: "GlobalTrade", accent: "Trade" },
  { name: "ShipFast", accent: "Fast" },
  { name: "QualityFirst", accent: "First" },
  { name: "ImportPro", accent: "Pro" },
  { name: "TradeLink", accent: "Link" },
  { name: "SourceDirect", accent: "Direct" },
  { name: "LogiPartner", accent: "Partner" },
];

export function LogosSection() {
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
    <section ref={sectionRef} className="bg-white section-padding overflow-hidden">
      <div className="container-custom mb-10">
        <h2
          className={`text-center text-xl font-medium text-[#666666] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Trusted by businesses across India
        </h2>
      </div>

      {/* Infinite Scroll Container */}
      <div
        className={`relative transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling Content */}
        <div className="flex animate-scroll">
          {/* First Set */}
          <div className="flex shrink-0">
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="shrink-0 px-8 py-4 mx-4 group cursor-pointer"
              >
                <div className="text-2xl font-bold text-gray-300 group-hover:text-[#0B1F33] transition-colors duration-300">
                  {partner.name.replace(partner.accent, "")}
                  <span className="group-hover:text-[#1F3A5F]">{partner.accent}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Duplicate for seamless loop */}
          <div className="flex shrink-0">
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="shrink-0 px-8 py-4 mx-4 group cursor-pointer"
              >
                <div className="text-2xl font-bold text-gray-300 group-hover:text-[#0B1F33] transition-colors duration-300">
                  {partner.name.replace(partner.accent, "")}
                  <span className="group-hover:text-[#1F3A5F]">{partner.accent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


