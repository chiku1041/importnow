"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroProps {
  subtitle?: string;
  badgeText?: string;
  badgeLink?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  rotatingPhrases?: string[];
}

const defaultPhrases = [
  "Without the Risk.",
  "Without Hidden Costs.",
  "With Verified Factories.",
];

const mobilePhrases = [
  "Without the Risk.",
  "Without Hidden Costs.",
  "With Verified Factories.",
];

export function HeroSection({
  subtitle = "End-to-end China sourcing, quality control, and import execution for Indian businesses.",
  badgeText,
  badgeLink,
  ctaText = "Get Free Quote",
  ctaHref = "/contact",
  secondaryCtaText,
  secondaryCtaHref,
  rotatingPhrases,
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and get appropriate phrases
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const phrases = rotatingPhrases || (isMobile ? mobilePhrases : defaultPhrases);
  // Slower on mobile: 4000ms total, 400ms animation
  // Desktop: 3000ms total, 400ms animation
  const totalDuration = isMobile ? 4000 : 3000;
  const animationDuration = 400; // 400ms for smooth transition

  // Handle rotating text animation
  useEffect(() => {
    if (phrases.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);

      // After exit animation completes, change text and trigger enter animation
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, animationDuration); // Animation duration (400ms)
    }, totalDuration); // Total time each phrase is shown

    return () => clearInterval(interval);
  }, [phrases, totalDuration, animationDuration]);
  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-pink-50 to-[#D96C00]/10"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          {/* Badge */}
          {badgeText && (
            <div className="flex justify-center">
              {badgeLink ? (
                <Link
                  href={badgeLink}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#0B1F33] hover:bg-white transition-colors shadow-sm"
                >
                  <span className="px-2 py-0.5 bg-[#D96C00] text-white rounded-full text-xs font-bold">
                    NEW
                  </span>
                  {badgeText}
                </Link>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#0B1F33] shadow-sm">
                  <span className="px-2 py-0.5 bg-[#D96C00] text-white rounded-full text-xs font-bold">
                    NEW
                  </span>
                  {badgeText}
                </div>
              )}
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-6">
            {/* Flags */}
            <div className="flex items-center justify-center gap-3 w-full">
              <Image
                src="/flag-china.png"
                alt="China flag"
                width={58}
                height={38}
                className="rounded-sm object-cover shadow-md"
              />
              <Image
                src="/flag-india.png"
                alt="India flag"
                width={58}
                height={38}
                className="rounded-sm object-cover shadow-md"
              />
            </div>
            <h1 className="font-black text-black leading-tight tracking-tight">
              <span className="block text-4xl md:text-6xl lg:text-7xl">Import from China.</span>
              <span className="block relative overflow-hidden h-[1.5em] md:h-[1.2em] text-3xl md:text-5xl lg:text-6xl">
                <span
                  className={`inline-block transition-all duration-400 ease-out ${
                    isAnimating
                      ? "translate-y-full opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  {phrases[currentIndex]}
                </span>
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-[#666666] max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#D96C00] hover:bg-[#C55F00] text-white font-semibold px-8 py-6 text-lg shadow-lg"
              asChild
            >
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
            {secondaryCtaText && secondaryCtaHref && (
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#0B1F33] bg-white text-[#0B1F33] hover:bg-[#F5F7FA] font-semibold px-8 py-6 text-lg"
                asChild
              >
                <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
