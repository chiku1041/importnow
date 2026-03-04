"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function CTASection() {
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
    <section ref={sectionRef} className="bg-[#C56A2D] section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container-custom relative">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <MessageCircle className="h-16 w-16 text-white/80 mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Simplify Your Imports?
          </h2>
          
          <p className="text-xl text-white/90 mb-8">
            Let&apos;s discuss how ImportNow can help you save time, reduce risks, 
            and grow your business with reliable China imports.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#0B1F33] text-white hover:bg-[#081620] shadow-lg"
              asChild
            >
              <Link href="/contact" className="group">
                Get a Free Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-sm">India Operations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇨🇳</span>
              <span className="text-sm">China Presence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">5+ Years</span>
              <span className="text-sm">Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


