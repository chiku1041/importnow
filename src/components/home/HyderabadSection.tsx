"use client";

import { MapPin, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function HyderabadSection() {
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
    <section ref={sectionRef} className="bg-white section-padding">
      <div className="container-custom">
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F7FA] rounded-full mb-6">
              <MapPin className="h-5 w-5 text-[#0B1F33]" />
              <span className="text-sm font-medium text-[#0B1F33]">Our Presence</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Hyderabad&apos;s Import Partner with{" "}
              <span className="text-[#0B1F33]">Teams Across China</span>
            </h2>
            <p className="text-lg text-[#666666] max-w-3xl mx-auto">
              Based in Hyderabad, with on-ground sourcing teams in Shenzhen, Guangzhou, Yiwu, and Shanghai.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#F5F7FA] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-[#0B1F33] flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#1F2933]">India Offices</h3>
              </div>
              <p className="text-[#666666]">
                Our headquarters in Hyderabad gives us deep understanding of Indian customs, logistics, and business needs. We&apos;re your local partner with global reach.
              </p>
            </div>

            <div className="bg-[#F5F7FA] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-[#0B1F33] flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#1F2933]">China Presence</h3>
              </div>
              <p className="text-[#666666]">
                Our sourcing and inspection teams are based in Shenzhen, Guangzhou, Yiwu, and Shanghai — the four biggest manufacturing and trading hubs in China. This on-ground presence ensures quality, speed, and direct supplier relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
