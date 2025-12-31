import { Metadata } from "next";
import {
  Package,
  Check,
  DollarSign,
  Clock,
  Eye,
  MapPin,
  AlertCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OnePrice - Simplified Importing",
  description:
    "OnePrice by ImportNow: Simplified importing for first-time and small-volume importers. Get upfront consolidated pricing and a fully guided import process.",
};

const benefits = [
  {
    icon: DollarSign,
    title: "Upfront Consolidated Pricing",
    description: "Know exactly what you'll pay before you commit. No hidden fees, no surprises.",
  },
  {
    icon: Clock,
    title: "Guided Process",
    description: "We walk you through every step, handling the complexity so you don't have to.",
  },
  {
    icon: Eye,
    title: "Full Visibility",
    description: "Track your shipment progress with clear stage updates throughout the journey.",
  },
  {
    icon: Shield,
    title: "Reduced Risk",
    description: "Designed for smaller shipments with built-in safeguards for first-time importers.",
  },
];

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description: "Create your OnePrice account to get started",
  },
  {
    number: 2,
    title: "Share Your Requirements",
    description: "Tell us what you want to import and the quantity",
  },
  {
    number: 3,
    title: "Receive Your Quote",
    description: "Get a comprehensive, all-inclusive price",
  },
  {
    number: 4,
    title: "Confirm & Pay",
    description: "Accept the quote and make payment",
  },
  {
    number: 5,
    title: "Receive Shipping Addresses",
    description: "Get China warehouse addresses after signup",
  },
  {
    number: 6,
    title: "We Handle Sourcing",
    description: "Our team sources your products from verified suppliers",
  },
  {
    number: 7,
    title: "Quality Check",
    description: "Products are inspected before shipping",
  },
  {
    number: 8,
    title: "Shipping Arranged",
    description: "We coordinate logistics from China to India",
  },
  {
    number: 9,
    title: "Customs Cleared",
    description: "Our network handles Indian customs smoothly",
  },
  {
    number: 10,
    title: "Delivery to You",
    description: "Receive your products at your specified address",
  },
];

const faqs = [
  {
    question: "Who is OnePrice for?",
    answer:
      "OnePrice is ideal for first-time importers, small-volume orders, and personal imports where simplicity and predictability matter most.",
  },
  {
    question: "What's the maximum order value?",
    answer:
      "OnePrice is designed for shipments up to ₹1,00,000. For orders exceeding $1000 in value, please discuss with us for customized solutions.",
  },
  {
    question: "Which countries are supported?",
    answer:
      "Currently, OnePrice supports imports from China. We're expanding to 7 countries soon — you'll see all options in your portal.",
  },
  {
    question: "What's included in the price?",
    answer:
      "The OnePrice quote includes sourcing, basic inspection, shipping, customs duties, and delivery. No hidden fees.",
  },
];

export default function OnePricePage() {
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F7FA] rounded-full mb-6">
                <Package className="h-5 w-5 text-[#0B1F33]" />
                <span className="text-sm font-semibold text-[#0B1F33]">OnePrice</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#1F2933] mb-6">
                Simplified Importing for{" "}
                <span className="text-[#0B1F33]">Small Shipments</span>
              </h1>

              <p className="text-xl text-[#666666] mb-8">
                OnePrice is designed for first-time and small-volume importers who want 
                a simpler way. Get upfront pricing and a fully guided process — built 
                for shipments where simplicity and predictability matter most.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" asChild>
                  <Link href="#signup">Sign Up Now</Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="#how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative hidden lg:block">
              <div className="bg-gradient-to-br from-[#0B1F33] to-[#1F3A5F] rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-[#F5F7FA] flex items-center justify-center">
                      <Package className="h-6 w-6 text-[#0B1F33]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F2933]">OnePrice Quote</p>
                      <p className="text-sm text-[#666666]">All-inclusive pricing</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">Product Cost</span>
                      <span className="text-[#1F2933]">Included</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">Shipping</span>
                      <span className="text-[#1F2933]">Included</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">Customs & Duties</span>
                      <span className="text-[#1F2933]">Included</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666666]">Delivery</span>
                      <span className="text-[#1F2933]">Included</span>
                    </div>
                    <hr className="border-[#e5e7eb]" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-[#1F2933]">Total</span>
                      <span className="text-[#0B1F33]">One Simple Price</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#0B1F33]">
                    <Check className="h-4 w-4" />
                    <span>No hidden fees</span>
                  </div>
                </div>
              </div>
            </div>
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

      {/* Benefits Section */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Why <span className="text-[#0B1F33]">OnePrice</span>?
            </h2>
            <p className="text-lg text-[#666666]">
              Designed specifically for importers who value simplicity
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} variant="default" className="bg-white text-center">
                <div className="h-14 w-14 rounded-xl bg-[#F5F7FA] flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-7 w-7 text-[#0B1F33]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2933] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#666666]">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#F5F7FA] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#1F2933] mb-4">
                  OnePrice is <span className="text-[#0B1F33]">Perfect For</span>
                </h3>
                <ul className="space-y-3">
                  {[
                    "First-time importers testing the waters",
                    "Small-volume orders under ₹1,00,000",
                    "Personal imports for resale or use",
                    "Businesses wanting predictable costs",
                    "Anyone who values simplicity over complexity",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#0B1F33] shrink-0 mt-0.5" />
                      <span className="text-[#1F2933]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#1F2933] mb-4">
                  Consider Our <span className="text-[#0B1F33]">Full Services</span> If
                </h3>
                <ul className="space-y-3">
                  {[
                    "Your order exceeds ₹1,00,000 value",
                    "You need customized manufacturing",
                    "You require extensive quality controls",
                    "You're importing regulated products",
                    "You need ongoing, large-scale sourcing",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-[#0B1F33] shrink-0 mt-0.5" />
                      <span className="text-[#1F2933]">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" className="mt-6" asChild>
                  <Link href="/services">View Full Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-[#F5F7FA] section-padding scroll-mt-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              How OnePrice <span className="text-[#0B1F33]">Works</span>
            </h2>
            <p className="text-lg text-[#666666]">
              A simple 10-step journey from signup to delivery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="h-10 w-10 rounded-full bg-[#C56A2D] text-white font-bold flex items-center justify-center shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1F2933]">{step.title}</h4>
                    <p className="text-sm text-[#666666]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tracking & Support */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F7FA] rounded-full mb-6">
                <MapPin className="h-5 w-5 text-[#0B1F33]" />
                <span className="text-sm font-medium text-[#0B1F33]">Tracking</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-6">
                Full <span className="text-[#0B1F33]">Visibility</span>
              </h2>

              <p className="text-lg text-[#666666] mb-6">
                Track your shipment every step of the way. Our portal provides clear 
                stage updates so you always know where your products are.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Real-time tracking updates",
                  "Clear milestone notifications",
                  "Light human support when needed",
                  "Estimated delivery timelines",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-[#0B1F33]" />
                    <span className="text-[#1F2933]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="bg-[#F5F7FA] rounded-2xl p-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-[#1F2933] mb-4">Shipment Progress</h4>
                <div className="space-y-4">
                  {[
                    { status: "Order Confirmed", complete: true },
                    { status: "Sourcing Complete", complete: true },
                    { status: "Quality Checked", complete: true },
                    { status: "Shipped from China", complete: true },
                    { status: "In Transit", complete: false, current: true },
                    { status: "Customs Clearance", complete: false },
                    { status: "Out for Delivery", complete: false },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          item.complete
                            ? "bg-[#0B1F33]"
                            : item.current
                            ? "bg-[#1F3A5F] animate-pulse"
                            : "bg-gray-200"
                        }`}
                      >
                        {item.complete && <Check className="h-4 w-4 text-white" />}
                      </div>
                      <span
                        className={`text-sm ${
                          item.complete || item.current
                            ? "text-[#1F2933]"
                            : "text-[#888888]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Disclaimers */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#1F2933] mb-6 text-center">
                Pricing <span className="text-[#0B1F33]">Information</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#F5F7FA] rounded-xl p-4">
                  <h4 className="font-semibold text-[#1F2933] mb-2">Order Limit</h4>
                  <p className="text-[#666666] text-sm">Up to ₹1,00,000 per shipment</p>
                </div>
                <div className="bg-[#F5F7FA] rounded-xl p-4">
                  <h4 className="font-semibold text-[#1F2933] mb-2">Larger Orders</h4>
                  <p className="text-[#666666] text-sm">
                    Orders &gt;$1000 — please discuss with us
                  </p>
                </div>
              </div>

              <div className="border-t border-[#e5e7eb] pt-6">
                <div className="flex items-start gap-3 text-sm text-[#666666]">
                  <AlertCircle className="h-5 w-5 text-[#0B1F33] shrink-0 mt-0.5" />
                  <p>
                    <strong>Note:</strong> OnePrice is designed for simplicity. For complex 
                    orders, customized products, or specific compliance requirements, our 
                    full service offerings may be more suitable.{" "}
                    <Link href="/contact" className="text-[#0B1F33] hover:underline">
                      Contact us
                    </Link>{" "}
                    to discuss your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-8 text-center">
              Common <span className="text-[#0B1F33]">Questions</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} variant="default" className="bg-[#F5F7FA]" hover={false}>
                  <h4 className="font-semibold text-[#1F2933] mb-2">{faq.question}</h4>
                  <p className="text-[#666666]">{faq.answer}</p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="secondary" asChild>
                <Link href="/faq">View All FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up CTA */}
      <section id="signup" className="bg-[#0B1F33] section-padding scroll-mt-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Package className="h-16 w-16 text-[#1F3A5F] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Sign up for OnePrice and experience simplified importing
            </p>
            <Button
              size="lg"
              className="bg-white text-[#0B1F33] hover:bg-[#F5F7FA]"
              asChild
            >
              <Link href="/contact">Sign Up Now</Link>
            </Button>
            <p className="text-white/70 text-sm mt-4">
              You&apos;ll receive shipping addresses after signup
            </p>
          </div>
        </div>
      </section>
    </>
  );
}


