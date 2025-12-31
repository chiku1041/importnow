"use client";

import { Card } from "@/components/ui/card";
import { ShoppingBag, Store, Briefcase, Factory } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const partners = [
  {
    icon: ShoppingBag,
    title: "D2C Brands",
    description: "Expanding product lines and scaling operations with reliable supply chains.",
  },
  {
    icon: Store,
    title: "Amazon & Flipkart Sellers",
    description: "Scaling inventory with competitive pricing and quality assurance.",
  },
  {
    icon: Briefcase,
    title: "Professional Importers",
    description: "Streamlining operations with end-to-end import management.",
  },
  {
    icon: Factory,
    title: "Direct Manufacturer Sourcers",
    description: "Connecting directly with verified manufacturers for best prices.",
  },
];

export function PartnersSection() {
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
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold text-[#1F2933] mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Who We <span className="text-[#0B1F33]">Work With</span>
          </h2>
          <p
            className={`text-lg text-[#666666] transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We support established businesses across categories like electronics, 
            consumer products, medical devices, and more
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <Card
              key={index}
              variant="default"
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Icon */}
              <div className="h-14 w-14 rounded-xl bg-[#F5F7FA] flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110 hover:bg-[#1F3A5F]">
                <partner.icon className="h-7 w-7 text-[#0B1F33]" />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-[#1F2933] mb-2">
                {partner.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-[#666666]">{partner.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


