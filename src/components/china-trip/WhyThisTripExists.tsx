"use client";

import { useState, useEffect, useRef } from "react";

export function WhyThisTripExists() {
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
      { threshold: 0.2 }
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
          <div className="relative pl-6 lg:pl-8">
            {/* Red vertical accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C53030] rounded-full"></div>

            <div
              className={`space-y-8 transition-all duration-300 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A]">
                Why This Trip Exists
              </h2>
              <div className="space-y-6 text-[17px] lg:text-lg text-[#334155] leading-[1.75]">
                <p>
                  Most importers learn by trial and error. You place orders,
                  hope for the best, and discover quality issues months later
                  when containers arrive.
                </p>
                <p>
                  This trip exists to{" "}
                  <span className="font-medium text-[#0F172A]">
                    compress years of learning into one focused week
                  </span>
                  . You'll see factories in action, understand quality control
                  processes firsthand, and build relationships with suppliers
                  who can scale with your business.
                </p>
                <p>
                  This isn't a tour. It's a practical education in how China
                  manufacturing actually works—from raw materials to finished
                  products, from negotiation to quality assurance.
                </p>
                <p>
                  You'll leave with supplier contacts, product samples, and the
                  confidence to make better sourcing decisions. No travel-agency
                  fluff. Just{" "}
                  <span className="font-medium text-[#0F172A]">
                    real business value
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
