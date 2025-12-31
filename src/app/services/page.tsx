import { Metadata } from "next";
import {
  Palette,
  Search,
  ClipboardCheck,
  Truck,
  FileCheck,
  Package,
  ArrowRight,
  Check,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive import services from China to India: product sourcing, quality inspection, logistics, customs clearance, and brand building. Modular solutions for your business needs.",
};

const services = [
  {
    id: "brand-building",
    icon: Palette,
    title: "Brand Building",
    description:
      "From product design to packaging, we help you create compelling products that stand out in the market.",
    features: [
      "Product design consultation",
      "Packaging design support",
      "Private labeling assistance",
      "Brand positioning guidance",
    ],
  },
  {
    id: "sourcing",
    icon: Search,
    title: "Product Sourcing",
    description:
      "Access our network of 1000+ verified manufacturers to find the right suppliers for your products.",
    features: [
      "Manufacturer identification",
      "Price negotiation",
      "Sample coordination",
      "Supplier verification",
    ],
  },
  {
    id: "inspection",
    icon: ClipboardCheck,
    title: "Quality Inspection",
    description:
      "Pre-shipment inspections ensure you receive exactly what you ordered, every time.",
    features: [
      "Pre-shipment inspection",
      "During production checks",
      "Factory audits",
      "Quality reports",
    ],
  },
  {
    id: "logistics",
    icon: Truck,
    title: "Supply Chain & Logistics",
    description:
      "End-to-end logistics management from factory to your warehouse in India.",
    features: [
      "Freight forwarding",
      "Shipping coordination",
      "Warehousing support",
      "Door-to-door delivery",
    ],
  },
  {
    id: "customs",
    icon: FileCheck,
    title: "Customs Clearance",
    description:
      "Navigate Indian customs with ease through our established network and expertise.",
    features: [
      "Documentation preparation",
      "Duty calculation",
      "Customs liaison",
      "Compliance assurance",
    ],
  },
];

const categories = [
  "Electronics & Components",
  "Consumer Products",
  "Medical Devices",
  "Home & Kitchen",
  "Fashion & Accessories",
  "Industrial Equipment",
  "Toys & Games",
  "Sports & Outdoor",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #0B1F33 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="container-custom section-padding relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F7FA] rounded-full mb-6">
              <Package className="h-5 w-5 text-[#0B1F33]" />
              <span className="text-sm font-medium text-[#0B1F33]">Our Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2933] mb-6">
              Comprehensive Support for Your{" "}
              <span className="text-[#0B1F33]">Import Needs</span>
            </h1>

            <p className="text-xl text-[#666666] mb-8">
              From sourcing to delivery, we provide modular services that adapt to 
              your requirements. Choose what you need, skip what you don&apos;t.
            </p>

            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Get a Custom Quote</Link>
            </Button>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F5F7FA"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#1F3A5F] section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We <span className="text-[#C56A2D]">Offer</span>
            </h2>
            <p className="text-lg text-[#C9D4E0]">
              Our modular services let you pick exactly what your business needs. 
              No forced bundles, no unnecessary fees.
            </p>
          </div>

          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <Card variant="default" className="bg-[#0B1F33] p-8 border border-[#1F3A5F]">
                  <div className="grid md:grid-cols-3 gap-6 items-start">
                    {/* Icon & Title */}
                    <div className="md:col-span-1">
                      <div className="h-16 w-16 rounded-2xl bg-[#1F3A5F] flex items-center justify-center mb-4">
                        <service.icon className="h-8 w-8 text-[#C56A2D]" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-[#C9D4E0]">{service.description}</p>
                    </div>

                    {/* Features */}
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-semibold text-[#C56A2D] uppercase tracking-wide mb-4">
                        What&apos;s Included
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-[#1F3A5F] flex items-center justify-center shrink-0">
                              <Check className="h-4 w-4 text-[#C56A2D]" />
                            </div>
                            <span className="text-white">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Categories We <span className="text-[#0B1F33]">Serve</span>
            </h2>
            <p className="text-lg text-[#666666]">
              Our expertise spans across multiple product categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-[#F5F7FA] rounded-xl p-4 text-center hover:bg-[#1F3A5F] transition-colors cursor-default"
              >
                <span className="text-[#1F2933] font-medium">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Visits Section */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6">
                <Plane className="h-5 w-5 text-[#0B1F33]" />
                <span className="text-sm font-medium text-[#0B1F33]">Factory Visits</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-6">
                See It <span className="text-[#0B1F33]">Firsthand</span>
              </h2>

              <p className="text-lg text-[#666666] mb-6">
                Want to visit your manufacturer in person? We arrange and guide factory 
                visits, helping you build direct relationships with suppliers.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Travel arrangement assistance",
                  "Factory visit coordination",
                  "On-ground support in China",
                  "Translator services available",
                  "Multiple factory visits in one trip",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-[#0B1F33]" />
                    <span className="text-[#1F2933]">{item}</span>
                  </li>
                ))}
              </ul>

              <Button variant="secondary" asChild>
                <Link href="/contact">Inquire About Factory Visits</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#0B1F33] to-[#1F3A5F] rounded-2xl aspect-video flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Plane className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-semibold">Visit Factories in China</p>
                  <p className="opacity-90">We&apos;ll guide you every step of the way</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              How It <span className="text-[#0B1F33]">Works</span>
            </h2>
            <p className="text-lg text-[#666666]">
              Simple, transparent process from inquiry to delivery
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Discuss", description: "Share your requirements and goals" },
              { step: "2", title: "Plan", description: "We create a tailored service package" },
              { step: "3", title: "Execute", description: "Our team handles the details" },
              { step: "4", title: "Deliver", description: "Receive your products in India" },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="h-16 w-16 rounded-full bg-[#C56A2D] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-[#1F2933] mb-2">{item.title}</h3>
                <p className="text-sm text-[#666666]">{item.description}</p>

                {index < 3 && (
                  <ArrowRight className="hidden md:block h-6 w-6 text-[#2E7F7A] absolute top-6 -right-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0B1F33] section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let&apos;s Discuss Your Requirements
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get a custom quote tailored to your specific import needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#0B1F33] hover:bg-[#F5F7FA]"
                asChild
              >
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0B1F33]"
                asChild
              >
                <Link href="/oneprice">Try OnePrice</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


