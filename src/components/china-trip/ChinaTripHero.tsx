"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export function ChinaTripHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/+919989724320?text=Hi%2C%20I%27m%20interested%20in%20the%20China%20Import%20Learning%20Trip",
      "_blank"
    );
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center bg-gradient-to-b from-[#FDF8F6] via-[#FEF7F4] to-white">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col items-center text-center space-y-8 py-16 transition-all duration-500 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="font-black text-[#0F172A] leading-tight tracking-tight">
              <span className="block text-4xl md:text-6xl lg:text-7xl">
                Learn China Importing
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl mt-2">
                <span className="relative inline-block">
                  Hands-On
                  <span className="absolute -bottom-2 left-0 right-0 h-[4px] bg-[#C53030]"></span>
                </span>
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-[#666666] max-w-3xl mx-auto leading-relaxed">
              A practical, business-focused trip to Canton Fair, Shenzhen
              markets, and factories. Built for importers who want real
              knowledge, not tourism.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleWhatsAppClick}
              className="bg-[#C53030] text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#B91C1C] transition-colors duration-200 flex items-center gap-2 shadow-sm"
            >
              <MessageCircle size={18} strokeWidth={2} />
              Get itinerary + pricing on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
