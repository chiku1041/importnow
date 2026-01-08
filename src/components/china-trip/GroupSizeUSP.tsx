"use client";

import { useState, useEffect, useRef } from "react";

export function GroupSizeUSP() {
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
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="max-w-2xl mx-auto text-center">
          <div
            className={`transition-all duration-300 ease-out ${
              isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            {/* Large Number Visual */}
            <div className="inline-flex items-center justify-center w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-[#F8FAFC] border-[3px] border-[#C53030] mb-6">
              <span className="text-5xl lg:text-6xl font-semibold text-[#0F172A]">
                10
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A] mb-4">
              Small Group, Real Learning
            </h2>
            <p className="text-[17px] lg:text-lg text-[#334155] leading-relaxed max-w-xl mx-auto">
              We limit each trip to 10 participants. This ensures personalized
              attention, meaningful supplier interactions, and a focused
              learning environment. No large tour groups. No rushed factory
              visits. Just serious business learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
