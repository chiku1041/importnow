"use client";

import { Button } from "@/components/ui/button";
import { Package, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const features = [
  "Upfront consolidated pricing",
  "Fully guided import process",
  "Perfect for smaller shipments",
  "Reduced complexity and hassle",
];

export function OnePriceSection() {
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
    <section ref={sectionRef} className="bg-[#F5F7FA] section-padding">
      <div className="container-custom">
        <div
          className={`bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border-2 border-[#1F3A5F] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F7FA] rounded-full mb-6">
                <Package className="h-5 w-5 text-[#0B1F33]" />
                <span className="text-sm font-semibold text-[#0B1F33]">New Service</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
                Introducing{" "}
                <span className="text-[#0B1F33]">OnePrice</span> by ImportNow
              </h2>

              <p className="text-lg text-[#666666] mb-6">
                OnePrice is designed for first-time and small-volume importers who want 
                a simpler way. Get a consolidated cost upfront and a fully guided 
                process — built for smaller shipments where simplicity, predictability, 
                and visibility matter most.
              </p>

              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                  >
                    <CheckCircle className="h-5 w-5 text-[#0B1F33] shrink-0" />
                    <span className="text-[#1F2933]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant="secondary" size="lg" asChild>
                <Link href="/oneprice" className="group">
                  Learn More
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Visual */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Main Circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0B1F33] to-[#1F3A5F] opacity-10" />
                
                {/* Inner Content */}
                <div className="absolute inset-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <Package className="h-16 w-16 text-[#0B1F33] mx-auto mb-4" />
                    <p className="text-2xl font-bold text-[#1F2933]">OnePrice</p>
                    <p className="text-[#666666]">Simple. Transparent. Easy.</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-[#0B1F33] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  All-inclusive
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-[#1F3A5F] text-[#1F2933] px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  No hidden costs
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border-2 border-[#0B1F33] text-[#0B1F33] px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Guided
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border-2 border-[#1F3A5F] text-[#0B1F33] px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Simple
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


