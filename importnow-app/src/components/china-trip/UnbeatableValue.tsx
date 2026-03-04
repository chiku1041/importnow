"use client";

import { useState, useEffect, useRef } from "react";
import { MinusCircle, Building, UserCheck } from "lucide-react";

const bulletPoints = [
  { text: "No unnecessary markups", icon: MinusCircle },
  { text: "No middlemen agencies", icon: Building },
  { text: "Direct access to expertise", icon: UserCheck },
];

export function UnbeatableValue() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className={`max-w-2xl mx-auto text-center transition-all duration-[250ms] ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Thin muted red divider line */}
          <div className="w-16 h-[2px] bg-[#C53030]/40 mx-auto mb-8"></div>

          <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#0F172A] mb-6">
            Cost-Efficient by Design
          </h3>

          <div className="space-y-4 mb-8">
            <p className="text-[17px] lg:text-lg text-[#334155] leading-relaxed">
              This trip is intentionally priced lower than comparable Canton
              Fair + Shenzhen programs.
            </p>
            <p className="text-[17px] lg:text-lg text-[#334155] leading-relaxed">
              Not by cutting corners, but by removing unnecessary markups and
              middlemen.
            </p>
            <p className="text-[17px] lg:text-lg text-[#334155] leading-relaxed">
              You pay for{" "}
              <span className="font-medium text-[#0F172A]">direct expertise</span>
              , not inflated tour packaging.
            </p>
          </div>

          {/* Bullet points */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {bulletPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2.5 text-[#64748B]"
                >
                  <Icon size={18} strokeWidth={1.5} className="flex-shrink-0" />
                  <span className="text-[15px]">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
