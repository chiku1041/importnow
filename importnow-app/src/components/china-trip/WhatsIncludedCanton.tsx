"use client";

import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

const included = [
  "3 days Canton Fair visit",
  "1 day Guangzhou sightseeing and wholesale markets",
  "1 day Shenzhen electronics market",
  "Bullet train experience",
  "Local metro experience",
  "Flight from Hyderabad/Chennai",
  "4/5 star hotel stay with breakfast and dinner",
  "Business Visa included",
  "All local transportation and airport transfers",
];

export function WhatsIncludedCanton() {
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
    <section className="bg-white py-20 lg:py-32">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="max-w-3xl mx-auto">
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A] text-center mb-12">
            What's Included
          </h2>
          <div
            className={`bg-[#F8FAFC] rounded-xl p-6 lg:p-8 border border-[#E2E8F0] transition-all duration-300 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {included.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check
                      size={12}
                      className="text-[#16A34A]"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-[#334155] text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

