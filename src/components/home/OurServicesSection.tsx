"use client";

import Link from "next/link";
import {
  Palette,
  Search,
  ClipboardCheck,
  Truck,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Palette,
    title: "Brand Building",
    description: "Product design, packaging, and private labeling support",
    href: "/services#brand-building",
  },
  {
    icon: Search,
    title: "Product Sourcing",
    description: "Access 1000+ verified manufacturers across categories",
    href: "/services#sourcing",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Inspection",
    description: "Pre-shipment checks and factory audits",
    href: "/services#inspection",
  },
  {
    icon: Truck,
    title: "Supply Chain & Logistics",
    description: "End-to-end freight and door-to-door delivery",
    href: "/services#logistics",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    description: "Documentation and compliance handling",
    href: "/services#customs",
  },
];

export function OurServicesSection() {
  return (
    <section className="bg-[#0B1F33] section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F3A5F] rounded-full mb-6">
            <span className="text-sm font-medium text-[#C9D4E0]">Modular Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="text-[#C56A2D]">Services</span>
          </h2>
          <p className="text-lg text-[#C9D4E0]">
            Pick what you need, skip what you don&apos;t. Our services adapt to your requirements.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group bg-[#1F3A5F]/50 hover:bg-[#1F3A5F] border border-[#1F3A5F] rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="h-12 w-12 rounded-xl bg-[#0B1F33] flex items-center justify-center mb-4 group-hover:bg-[#C56A2D] transition-colors">
                <service.icon className="h-6 w-6 text-[#C56A2D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[#C9D4E0] mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-[#C56A2D] group-hover:text-white transition-colors">
                Learn more
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-white text-[#0B1F33] hover:bg-[#F5F7FA]"
            asChild
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}



