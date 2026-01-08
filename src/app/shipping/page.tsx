import { Metadata } from "next";
import { Truck, Clock, Package, MapPin, AlertCircle, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Shipping Policy - ImportNow",
  description:
    "ImportNow's shipping policy - timelines, costs, tracking, and delivery information for China to India imports.",
  keywords: [
    "shipping policy",
    "China to India shipping",
    "freight forwarding",
    "delivery timeline",
  ],
  openGraph: {
    title: "Shipping Policy - ImportNow",
    description:
      "ImportNow's shipping policy - timelines, costs, tracking, and delivery information for China to India imports.",
    url: "https://importnow.in/shipping",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping Policy - ImportNow",
    description:
      "ImportNow's shipping policy - timelines, costs, tracking, and delivery information.",
  },
  alternates: {
    canonical: "https://importnow.in/shipping",
  },
};

const shippingMethods = [
  {
    icon: Truck,
    title: "Sea Freight",
    timeline: "25-35 days",
    description: "Most economical option for large shipments",
    features: ["Cost-effective", "Suitable for bulk orders", "Full container & LCL options"],
  },
  {
    icon: Package,
    title: "Air Freight",
    timeline: "7-15 days",
    description: "Faster delivery for time-sensitive orders",
    features: ["Quick delivery", "Ideal for samples", "Premium service"],
  },
  {
    icon: MapPin,
    title: "Express Courier",
    timeline: "3-7 days",
    description: "Fastest option for small packages",
    features: ["Door-to-door", "Real-time tracking", "Best for small shipments"],
  },
];

export default function ShippingPage() {
  const baseUrl = "https://importnow.in";
  const pageUrl = `${baseUrl}/shipping`;

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Shipping Policy", url: pageUrl },
  ]);

  // WebPage structured data
  const webPageSchema = generateWebPageSchema({
    name: "Shipping Policy - ImportNow",
    description:
      "ImportNow's shipping policy - timelines, costs, tracking, and delivery information for China to India imports.",
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: baseUrl },
      { name: "Shipping Policy", url: pageUrl },
    ],
  });

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

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
              <Truck className="h-5 w-5 text-[#0B1F33]" />
              <span className="text-sm font-medium text-[#0B1F33]">Shipping</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2933] mb-6">
              Shipping <span className="text-[#0B1F33]">Policy</span>
            </h1>

            <p className="text-xl text-[#666666]">
              Everything you need to know about shipping from China to India
            </p>
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

      {/* Shipping Methods */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F2933] mb-8 text-center">
              Shipping <span className="text-[#0B1F33]">Methods</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {shippingMethods.map((method, index) => (
                <Card key={index} variant="default" className="bg-white text-center">
                  <div className="h-14 w-14 rounded-xl bg-[#F5F7FA] flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-7 w-7 text-[#0B1F33]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1F2933] mb-2">
                    {method.title}
                  </h3>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#0B1F33] text-white rounded-full text-sm mb-3">
                    <Clock className="h-4 w-4" />
                    {method.timeline}
                  </div>
                  <p className="text-[#666666] mb-4">{method.description}</p>
                  <ul className="space-y-2">
                    {method.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2 text-sm text-[#666666]">
                        <Check className="h-4 w-4 text-[#0B1F33]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Shipping Costs */}
              <div>
                <h2 className="text-2xl font-bold text-[#1F2933] mb-4">
                  Shipping Costs
                </h2>
                <div className="bg-[#F5F7FA] rounded-xl p-6">
                  <p className="text-[#666666] mb-4">
                    Shipping costs vary based on several factors:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Volume and weight of your shipment",
                      "Shipping method chosen (sea, air, or express)",
                      "Origin and destination locations",
                      "Type of products being shipped",
                      "Current market rates and fuel surcharges",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#0B1F33] shrink-0 mt-0.5" />
                        <span className="text-[#1F2933]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#666666] mt-4">
                    For OnePrice orders, shipping is included in your quoted price. For 
                    custom orders, we provide detailed shipping quotes as part of your 
                    overall quotation.
                  </p>
                </div>
              </div>

              {/* Tracking */}
              <div>
                <h2 className="text-2xl font-bold text-[#1F2933] mb-4">
                  Shipment Tracking
                </h2>
                <div className="bg-[#F5F7FA] rounded-xl p-6">
                  <p className="text-[#666666] mb-4">
                    All shipments come with tracking capabilities:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Real-time tracking updates via our portal",
                      "Email notifications at key milestones",
                      "Estimated delivery date updates",
                      "Customs clearance status visibility",
                      "Delivery confirmation notification",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#0B1F33] shrink-0 mt-0.5" />
                        <span className="text-[#1F2933]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Customs & Duties */}
              <div>
                <h2 className="text-2xl font-bold text-[#1F2933] mb-4">
                  Customs & Duties
                </h2>
                <div className="bg-[#F5F7FA] rounded-xl p-6">
                  <p className="text-[#666666] mb-4">
                    Import duties and taxes are applicable on all shipments entering India:
                  </p>
                  <ul className="space-y-3 mb-4">
                    {[
                      "Duties vary based on product category (HSN code)",
                      "GST applies on the landed value of goods",
                      "We provide duty estimates in your quote",
                      "Our network handles customs clearance",
                      "Documentation prepared to minimize delays",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#0B1F33] shrink-0 mt-0.5" />
                        <span className="text-[#1F2933]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <AlertCircle className="h-5 w-5 text-[#0B1F33] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#666666]">
                      <strong>Note:</strong> Actual duty amounts may vary based on 
                      customs assessment. Any additional duties will be communicated 
                      before they're incurred.
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div>
                <h2 className="text-2xl font-bold text-[#1F2933] mb-4">
                  Delivery Information
                </h2>
                <div className="bg-[#F5F7FA] rounded-xl p-6">
                  <p className="text-[#666666] mb-4">
                    We offer flexible delivery options:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Door-to-door delivery to your warehouse or office",
                      "Port pickup available if preferred",
                      "Multiple delivery addresses for split shipments",
                      "Delivery coordination with your team",
                      "Proof of delivery documentation",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#0B1F33] shrink-0 mt-0.5" />
                        <span className="text-[#1F2933]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Issues & Claims */}
              <div>
                <h2 className="text-2xl font-bold text-[#1F2933] mb-4">
                  Shipping Issues & Claims
                </h2>
                <div className="bg-[#F5F7FA] rounded-xl p-6">
                  <p className="text-[#666666] mb-4">
                    In case of shipping issues:
                  </p>
                  <ul className="space-y-3 mb-4">
                    {[
                      "Report any damage or discrepancy within 48 hours of delivery",
                      "Document issues with photos and detailed description",
                      "We assist with carrier claims processing",
                      "Insurance options available for high-value shipments",
                      "Dedicated support for issue resolution",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#0B1F33] shrink-0 mt-0.5" />
                        <span className="text-[#1F2933]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B1F33] section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Have Shipping Questions?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our team is happy to help you understand shipping options for your needs.
            </p>
            <Button
              size="lg"
              className="bg-white text-[#0B1F33] hover:bg-[#F5F7FA]"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}


