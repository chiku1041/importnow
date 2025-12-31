import { HeroSection } from "@/components/home/HeroSection";
import { CommitmentSection } from "@/components/home/CommitmentSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { GallerySection } from "@/components/home/GallerySection";
import { OnePriceSection } from "@/components/home/OnePriceSection";
import { LogosSection } from "@/components/home/LogosSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection
        subtitle="End-to-end China sourcing, quality control, and import execution for Indian businesses."
        ctaText="Get Free Quote"
        ctaHref="/contact"
        secondaryCtaText="Explore Services"
        secondaryCtaHref="/services"
      />
      <CommitmentSection />
      <PartnersSection />
      <ExperienceSection />
      <GallerySection />
      <OnePriceSection />
      <LogosSection />
      <CTASection />
    </>
  );
}
