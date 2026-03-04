"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";

const included = [
  "International flights",
  "Visa fees",
  "All ground transportation during the trip",
  "Hotel accommodation (twin sharing)",
  "Canton Fair entry passes",
  "Bullet train tickets (Guangzhou to Shenzhen)",
  "Group meals (breakfast and dinner)",
  "Translation services",
  "Trip coordination and support",
  "Pearl River cruise",
];

const notIncluded = [
  "Personal expenses",
  "Lunch meals",
  "Travel insurance",
  "Individual shopping",
];

export function WhatsIncluded() {
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
    <section className="bg-[#F8FAFC] py-20 lg:py-32">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="max-w-4xl mx-auto">
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A] text-center mb-12">
            What's Included
          </h2>
          <div
            className={`grid md:grid-cols-2 gap-6 transition-all duration-300 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {/* Included */}
            <div className="bg-white rounded-lg p-6 lg:p-8 border border-[#E2E8F0]">
              <h3 className="text-[20px] lg:text-[22px] font-medium text-[#0F172A] mb-6">
                Included
              </h3>
              <ul className="space-y-3">
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

            {/* Not Included */}
            <div className="bg-[#F1F5F9] rounded-lg p-6 lg:p-8">
              <h3 className="text-[20px] lg:text-[22px] font-medium text-[#0F172A] mb-6">
                Not Included
              </h3>
              <ul className="space-y-3">
                {notIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E2E8F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Minus
                        size={12}
                        className="text-[#64748B]"
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
      </div>
    </section>
  );
}
