"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function ShenzhenElectronicsHub() {
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
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto"
        >
          {/* Left: Image */}
          <div
            className={`relative h-[320px] sm:h-[380px] lg:h-[450px] rounded-lg overflow-hidden transition-all duration-300 ease-out order-2 lg:order-1 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
          >
            {/* Badge */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-[#C53030] text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm">
                World's Largest Electronics Market
              </div>
            </div>
            <div className="absolute inset-0 bg-[#0F172A]/[0.04] z-10 pointer-events-none"></div>
            <Image
              src="/1.-华强北步行街.jpg"
              alt="Huaqiangbei electronics market street in Shenzhen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right: Text Content */}
          <div
            className={`space-y-6 transition-all duration-300 ease-out order-1 lg:order-2 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A]">
              Shenzhen Electronics Hub
            </h2>
            <div className="space-y-5 text-[17px] lg:text-lg text-[#334155] leading-[1.75]">
              <p>
                Huaqiangbei is where the world's electronics supply chain
                begins. This isn't a tourist market—it's a working ecosystem
                where components, finished products, and manufacturing knowledge
                converge.
              </p>
              <p>
                You'll see how products move from concept to production,
                understand component sourcing, and meet suppliers who serve
                global brands. This visit alone can{" "}
                <span className="font-medium text-[#0F172A]">
                  reshape how you think about electronics importing
                </span>
                .
              </p>
              <p>
                We'll also visit nearby factories to see production lines in
                action, giving you a complete picture of the electronics
                manufacturing process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
