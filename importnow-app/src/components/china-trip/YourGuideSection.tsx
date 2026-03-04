"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, Factory, Truck } from "lucide-react";
import Image from "next/image";

const stats = [
  { number: "1,000+", label: "shipments handled" },
  { number: "4+", label: "years on-ground China experience" },
  { number: "200+", label: "factory relationships" },
];

const credentials = [
  {
    icon: CheckCircle,
    text: "Direct factory access across Guangdong province",
  },
  { icon: Factory, text: "Quality control expertise from 1000+ inspections" },
  {
    icon: Truck,
    text: "End-to-end logistics knowledge from sourcing to delivery",
  },
];

export function YourGuideSection() {
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
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto"
        >
          {/* Left: Text Content */}
          <div
            className={`space-y-8 transition-all duration-300 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
          >
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A] mb-4">
                Your Guide
              </h2>
              <p className="text-[17px] lg:text-lg text-[#334155] leading-relaxed">
                This trip is led by someone who's been in your shoes. Not a tour
                guide, but a founder who's built an import business from the
                ground up.
              </p>
            </div>

            {/* Stats - Large Numbers */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-semibold text-[#0F172A] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[#334155] leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="space-y-4 pt-2">
              {credentials.map((cred, index) => {
                const Icon = cred.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Icon
                      size={20}
                      className="text-[#C53030] mt-0.5 flex-shrink-0"
                      strokeWidth={2}
                    />
                    <p className="text-[#334155] text-base">{cred.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Founder Image */}
          <div
            className={`relative h-[350px] lg:h-[450px] rounded-lg overflow-hidden transition-all duration-300 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <Image
              src="/IMG_3925.JPG"
              alt="Founder meeting with suppliers in China"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
