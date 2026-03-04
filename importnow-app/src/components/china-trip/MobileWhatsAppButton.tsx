"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface MobileWhatsAppButtonProps {
  whatsappLink?: string;
}

export function MobileWhatsAppButton({ 
  whatsappLink = "https://wa.me/+919989724320?text=Hi%2C%20I%27m%20interested%20in%20the%20China%20Import%20Learning%20Trip" 
}: MobileWhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show after scrolling 300px
      setIsVisible(scrollPosition > 300);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-200 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white border-t border-[#E2E8F0] px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <button
          onClick={handleClick}
          className="w-full bg-[#C53030] text-white py-3.5 rounded-[10px] font-medium text-base hover:bg-[#B91C1C] transition-colors duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <MessageCircle size={20} strokeWidth={2} />
          Get Itinerary + Pricing
        </button>
      </div>
    </div>
  );
}
