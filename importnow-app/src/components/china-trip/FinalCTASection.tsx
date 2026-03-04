"use client";

import { MessageCircle } from "lucide-react";

interface FinalCTASectionProps {
  whatsappLink?: string;
}

export function FinalCTASection({ 
  whatsappLink = "https://wa.me/+919989724320?text=Hi%2C%20I%27m%20interested%20in%20the%20China%20Import%20Learning%20Trip" 
}: FinalCTASectionProps) {
  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <section className="bg-[#0F172A] py-20 lg:py-28">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-semibold text-white leading-tight">
            Ready to Learn China Importing Hands-On?
          </h2>
          <p className="text-[17px] lg:text-lg text-[#94A3B8] leading-relaxed max-w-xl mx-auto">
            Get the complete itinerary, pricing, and dates. No commitment
            required. Just real information to help you decide.
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="bg-[#C53030] text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#B91C1C] transition-colors duration-200 inline-flex items-center gap-2 shadow-lg"
          >
            <MessageCircle size={18} strokeWidth={2} />
            Get Itinerary + Pricing on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
