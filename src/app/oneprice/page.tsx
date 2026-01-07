"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  Clock,
  Eye,
  Package,
  DollarSign,
  Shield,
  MapPin,
  ChevronDown,
} from "lucide-react";

export default function OnePricePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-36 pb-24 px-4 md:px-8 bg-gradient-to-b from-[#f8fafc] to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-white border border-[#e2e8f0] px-3.5 py-1.5 rounded-full text-xs text-[#475569] mb-6 shadow-sm">
                <span className="bg-[#e07a3d] text-white px-2 py-0.5 rounded-full font-semibold text-[11px] uppercase tracking-wide">
                  New
                </span>
                Introducing OnePrice by ImportNow
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#0f172a] mb-5 tracking-tight">
                Import Simplified.
                <br />
                <span className="bg-gradient-to-r from-[#e07a3d] to-[#f5a366] bg-clip-text text-transparent">
                  One Price. Zero Hassle.
                </span>
              </h1>
              <p className="text-lg text-[#475569] mb-8 max-w-lg leading-relaxed">
                Skip the complexity. Get a fixed per-kg rate for your small shipments—no
                negotiations, no surprises, no middlemen. Just sign up, ship, and track.
              </p>
              <div className="flex gap-3 mb-10">
                <Button variant="primary" size="lg" asChild className="bg-[#e07a3d] hover:bg-[#d16a2d] shadow-[0_2px_8px_rgba(224,122,61,0.25)] hover:shadow-[0_8px_24px_rgba(224,122,61,0.3)] hover:-translate-y-0.5">
                  <Link href="/signup">Sign Up for OnePrice</Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-5">
                {["No minimum order", "Self-service platform", "Best-in-class rates"].map(
                  (feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#475569] font-medium">
                      <Check className="w-[18px] h-[18px] text-[#10b981] flex-shrink-0" />
                      {feature}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-white rounded-[20px] p-8 shadow-2xl border border-[#f1f5f9] max-w-[380px] w-full animate-on-scroll">
                <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[#f1f5f9]">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#e07a3d] to-[#f5a366] rounded-[14px] flex items-center justify-center text-white">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-[#0f172a] tracking-tight">
                      OnePrice Quote
                    </div>
                    <div className="text-xs text-[#94a3b8] mt-0.5">
                      All-inclusive pricing
                    </div>
                  </div>
                </div>
                {[
                  "Shipping from Warehouse",
                  "Customs & Duties",
                  "Doorstep Delivery",
                  "Tracking & Updates",
                ].map((label, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-3.5 border-b border-[#f1f5f9] last:border-b-0"
                  >
                    <span className="text-[#475569] text-[15px]">{label}</span>
                    <span className="text-[#10b981] font-medium text-sm flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Included
                    </span>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t-2 border-[#0f172a] flex justify-between items-center">
                  <span className="font-semibold text-[#0f172a]">Total</span>
                  <span className="text-xl font-bold text-[#e07a3d] tracking-tight">
                    One Simple Price
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4 p-3 bg-[rgba(16,185,129,0.1)] rounded-[10px] text-xs text-[#10b981] font-medium">
                  <Check className="w-4 h-4" />
                  No hidden fees. Ever.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-24 px-4 md:px-8 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="inline-block bg-[rgba(224,122,61,0.1)] text-[#e07a3d] px-4 py-1.5 rounded-full font-semibold text-xs mb-4 tracking-wide">
              Perfect For You
            </span>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-3.5 tracking-tight">
              Who Is OnePrice For?
            </h2>
            <p className="text-lg text-[#475569] max-w-[560px] mx-auto leading-relaxed">
              Designed for importers who want simplicity without the complexity of
              traditional freight forwarding
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Package,
                title: "First-Time Importers",
                desc: "Testing the waters with your first import? Start small without the steep learning curve.",
              },
              {
                icon: DollarSign,
                title: "Small Resellers",
                desc: "Instagram sellers, marketplace vendors, and small e-commerce stores sourcing products.",
              },
              {
                icon: Shield,
                title: "D2C Brands",
                desc: "Testing new products or ordering samples before committing to larger volumes.",
              },
              {
                icon: MapPin,
                title: "Personal Imports",
                desc: "Ordering products for personal use without dealing with freight forwarders.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-7 text-center border border-[#f1f5f9] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-transparent animate-on-scroll ${
                  idx === 0 ? "stagger-1" : idx === 1 ? "stagger-2" : idx === 2 ? "stagger-3" : "stagger-4"
                }`}
              >
                <div className="w-14 h-14 bg-[rgba(224,122,61,0.1)] rounded-[14px] flex items-center justify-center mx-auto mb-5 text-[#e07a3d]">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-[#0f172a] mb-2 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-[#0f172a] rounded-2xl p-7 flex flex-col md:flex-row items-center justify-between gap-8 animate-on-scroll">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white mb-1 tracking-tight">
                  Need bulk imports, customization, or full container loads?
                </h4>
                <p className="text-sm text-white/60">
                  Our full-service ImportNow team handles complex requirements with
                  personalized support.
                </p>
              </div>
            </div>
            <Button variant="secondary" asChild className="flex-shrink-0 bg-white text-[#0f172a] border-0 hover:bg-[#f8fafc]">
              <Link href="/services">Explore Full Services →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="inline-block bg-[rgba(224,122,61,0.1)] text-[#e07a3d] px-4 py-1.5 rounded-full font-semibold text-xs mb-4 tracking-wide">
              Why OnePrice
            </span>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-3.5 tracking-tight">
              How OnePrice Helps You
            </h2>
            <p className="text-lg text-[#475569] max-w-[560px] mx-auto leading-relaxed">
              We&apos;ve stripped away the complexity so you can focus on your business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Fixed Per-KG Pricing",
                desc: "Know your exact cost upfront. Our all-inclusive per-kg rate covers shipping, customs, and delivery—no surprise charges.",
              },
              {
                icon: Clock,
                title: "Faster Transit Times",
                desc: "Our optimized routes and consolidated shipping means your products reach you faster than traditional forwarding.",
              },
              {
                icon: Check,
                title: "100% Self-Service",
                desc: "No back-and-forth emails or calls. Sign up, get addresses, ship—all from your dashboard, any time.",
              },
              {
                icon: Eye,
                title: "Real-Time Tracking",
                desc: "Know exactly where your shipment is at every step—from warehouse acceptance to doorstep delivery with accurate ETAs.",
              },
              {
                icon: Package,
                title: "No Minimum Order",
                desc: "Whether it's 1 kg or 50 kg, OnePrice works for you. Perfect for samples and small test batches.",
              },
              {
                icon: Shield,
                title: "Customs Handled",
                desc: "Don't worry about paperwork. We handle customs clearance at both origin and destination—it's all included.",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border border-[#f1f5f9] bg-white transition-all duration-300 hover:shadow-xl hover:border-transparent hover:-translate-y-1 animate-on-scroll ${
                  idx === 0 ? "stagger-1" : idx === 1 ? "stagger-2" : idx === 2 ? "stagger-3" : idx === 3 ? "stagger-4" : idx === 4 ? "stagger-5" : "stagger-6"
                }`}
              >
                <div className="w-12 h-12 bg-[rgba(224,122,61,0.1)] rounded-xl flex items-center justify-center text-[#e07a3d] mb-5">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[17px] font-semibold text-[#0f172a] mb-2.5 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-[15px] text-[#475569] leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 md:px-8 bg-[#f8fafc] scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="inline-block bg-[rgba(224,122,61,0.1)] text-[#e07a3d] px-4 py-1.5 rounded-full font-semibold text-xs mb-4 tracking-wide">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-3.5 tracking-tight">
              How OnePrice Works
            </h2>
            <p className="text-lg text-[#475569] max-w-[560px] mx-auto leading-relaxed">
              Five simple steps from signup to delivery
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative">
            <div className="hidden lg:block absolute top-9 left-[72px] right-[72px] h-0.5 bg-[#e2e8f0]"></div>
            {[
              {
                number: "1",
                title: "Sign Up",
                desc: "Create your OnePrice account with email or phone in under a minute.",
              },
              {
                number: "2",
                title: "Get Warehouse Address",
                desc: "Access your dedicated warehouse addresses in China and other locations.",
              },
              {
                number: "3",
                title: "Share with Supplier",
                desc: "Give your supplier the OnePrice warehouse address to ship your products.",
              },
              {
                number: "4",
                title: "Enter Tracking",
                desc: "Input the local tracking number from your supplier to monitor progress.",
              },
              {
                number: "5",
                title: "Receive at Doorstep",
                desc: "We handle everything else—customs, shipping, and delivery to your address.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`text-center relative animate-on-scroll ${
                  idx === 0 ? "stagger-1" : idx === 1 ? "stagger-2" : idx === 2 ? "stagger-3" : idx === 3 ? "stagger-4" : "stagger-5"
                }`}
              >
                <div className="w-[72px] h-[72px] bg-white border-2 border-[#e07a3d] rounded-full flex items-center justify-center mx-auto mb-5 text-[22px] font-bold text-[#e07a3d] relative z-10 transition-all duration-300 hover:bg-[#e07a3d] hover:text-white">
                  {step.number}
                </div>
                <h3 className="text-[15px] font-semibold text-[#0f172a] mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <span className="inline-block bg-[rgba(224,122,61,0.1)] text-[#e07a3d] px-4 py-1.5 rounded-full font-semibold text-xs mb-6 tracking-wide">
                Full Visibility
              </span>
              <h2 className="text-4xl font-bold text-[#0f172a] mb-4 tracking-tight">
                Track Every Step of Your Shipment
              </h2>
              <p className="text-lg text-[#475569] mb-8 leading-relaxed">
                Never wonder where your products are. Our real-time tracking gives you
                complete visibility from warehouse to doorstep with accurate ETAs.
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  "Real-time status updates",
                  "Accurate estimated arrival dates",
                  "Customs clearance notifications",
                  "Last-mile delivery tracking",
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-4 py-3 bg-[#f8fafc] rounded-[10px] text-[15px] text-[#475569] font-medium"
                  >
                    <Check className="w-[18px] h-[18px] text-[#10b981] flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#f8fafc] rounded-[20px] p-6 animate-on-scroll">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#f1f5f9]">
                  <span className="font-semibold text-[#0f172a]">Shipment Progress</span>
                  <span className="text-xs text-[#94a3b8] bg-[#f8fafc] px-3 py-1 rounded-full font-medium">
                    OP-2026-78432
                  </span>
                </div>
                <div className="relative pl-7">
                  <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-[#f1f5f9]"></div>
                  {[
                    { text: "Accepted by OnePrice Warehouse", date: "Jan 2", status: "done" },
                    { text: "Ready to Dispatch", date: "Jan 3", status: "done" },
                    { text: "Origin Customs Cleared", date: "Jan 4", status: "done" },
                    { text: "In Transit to India", date: "Now", status: "active" },
                    { text: "Arrived in India", date: "Est. Jan 8", status: "pending" },
                    { text: "India Customs Clearance", date: "Est. Jan 9", status: "pending" },
                    { text: "Local Dispatch", date: "Est. Jan 10", status: "pending" },
                    { text: "Delivered", date: "Est. Jan 11", status: "pending" },
                  ].map((item, idx) => (
                    <div key={idx} className="relative pb-3.5 last:pb-0">
                      <div
                        className={`absolute -left-7 top-0.5 w-3 h-3 rounded-full border-2 z-10 ${
                          item.status === "done"
                            ? "bg-[#10b981] border-[#10b981]"
                            : item.status === "active"
                            ? "bg-[#e07a3d] border-[#e07a3d] shadow-[0_0_0_4px_rgba(224,122,61,0.15)]"
                            : "bg-white border-[#e2e8f0]"
                        }`}
                      ></div>
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-xs font-medium ${
                            item.status === "pending"
                              ? "text-[#94a3b8]"
                              : "text-[#0f172a]"
                          }`}
                        >
                          {item.text}
                        </span>
                        <span className="text-xs text-[#94a3b8]">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-24 px-4 md:px-8 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="inline-block bg-[rgba(224,122,61,0.1)] text-[#e07a3d] px-4 py-1.5 rounded-full font-semibold text-xs mb-4 tracking-wide">
              Global Reach
            </span>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-3.5 tracking-tight">
              Ship from Multiple Countries
            </h2>
            <p className="text-lg text-[#475569] max-w-[560px] mx-auto leading-relaxed">
              Get warehouse addresses in multiple locations—more countries coming soon
            </p>
          </div>
          <div className="flex justify-center gap-5 flex-wrap">
            {[
              { flag: "🇨🇳", route: "China → India", status: "live" },
              { flag: "🇭🇰", route: "Hong Kong → India", status: "soon" },
              { flag: "🇨🇦", route: "Canada → India", status: "soon" },
              { flag: "🇲🇾", route: "Malaysia → India", status: "soon" },
              { flag: "🇦🇺", route: "Australia → India", status: "soon" },
            ].map((country, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-[14px] px-6 py-4.5 flex items-center gap-4 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md animate-on-scroll ${
                  country.status === "live"
                    ? "border-[#10b981] stagger-1"
                    : `border-[#f1f5f9] stagger-${idx + 1}`
                }`}
              >
                <span className="text-[26px]">{country.flag}</span>
                <div>
                  <h4 className="font-semibold text-[#0f172a] text-[15px] tracking-tight">
                    {country.route}
                  </h4>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block tracking-wide uppercase ${
                      country.status === "live"
                        ? "bg-[rgba(16,185,129,0.1)] text-[#10b981]"
                        : "bg-[#f1f5f9] text-[#94a3b8]"
                    }`}
                  >
                    {country.status === "live" ? "Available Now" : "Coming Soon"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 md:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="inline-block bg-[rgba(224,122,61,0.1)] text-[#e07a3d] px-4 py-1.5 rounded-full font-semibold text-xs mb-4 tracking-wide">
              Got Questions?
            </span>
            <h2 className="text-4xl font-bold text-[#0f172a] mb-3.5 tracking-tight font-sans">
              Common Questions
            </h2>
            <p className="text-lg text-[#475569] max-w-[560px] mx-auto leading-relaxed font-sans">
              Everything you need to know about OnePrice
            </p>
          </div>
          <div className="max-w-[720px] mx-auto">
            {[
              {
                question: "Who is OnePrice for?",
                answer:
                  "OnePrice is designed for first-time importers, small resellers, D2C brands testing products, and anyone making personal imports. It's perfect for those who want simplicity and predictability without the complexity of traditional freight forwarding.",
              },
              {
                question: "What's included in the OnePrice rate?",
                answer:
                  "Your OnePrice per-kg rate includes everything: shipping from our warehouse to India, customs clearance at both origin and destination, and doorstep delivery. No hidden fees, no surprises.",
              },
              {
                question: "What are the order limits?",
                answer:
                  "OnePrice works best for shipments under 50 kg—perfect for samples and small volumes with no minimum order. For bulk orders over 50 kg or higher value shipments, please contact our team directly for customized solutions.",
              },
              {
                question: "Which countries are supported?",
                answer:
                  "Currently, OnePrice supports imports from China to India. We're expanding soon to include Hong Kong, Canada, Malaysia, and Australia—you'll see all available options in your dashboard after signing up.",
              },
              {
                question: "Do you handle product quality inspection?",
                answer:
                  "OnePrice is a logistics-only service—we handle shipping from our warehouse to your doorstep. Product quality and quantity verification is between you and your supplier. If you need quality inspection, consider our full ImportNow services.",
              },
              {
                question: "How do I track my shipment?",
                answer:
                  "Once your supplier ships to our warehouse and you enter the tracking number, you'll get real-time updates through your dashboard. Track every step: warehouse acceptance, dispatch, customs clearance, transit, local delivery, and final delivery with accurate ETAs.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className={`border border-[#f1f5f9] rounded-[14px] mb-3 overflow-hidden transition-all duration-200 hover:border-[#e2e8f0] animate-on-scroll ${
                  idx === 0 ? "stagger-1" : idx === 1 ? "stagger-2" : idx === 2 ? "stagger-3" : idx === 3 ? "stagger-4" : idx === 4 ? "stagger-5" : "stagger-6"
                } ${activeFaq === idx ? "border-[#e2e8f0]" : ""}`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex justify-between items-center bg-white border-none cursor-pointer text-left text-[15px] font-semibold text-[#0f172a] tracking-tight font-sans"
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 text-[#94a3b8] flex-shrink-0 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180 text-[#e07a3d]" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === idx ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-[#475569] text-[15px] leading-relaxed font-sans">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-[#0f172a] text-center relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(224,122,61,0.12)_0%,transparent_50%)]"></div>
        <div className="max-w-2xl mx-auto relative z-10 animate-on-scroll">
          <div className="w-16 h-16 bg-white/8 rounded-[18px] flex items-center justify-center mx-auto mb-6 text-[#e07a3d]">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight font-sans">
            Ready to Simplify Your Imports?
          </h2>
          <p className="text-lg text-white/65 mb-8 leading-relaxed font-sans">
            Sign up for OnePrice and get your warehouse addresses instantly. No calls, no
            negotiations—just simple importing.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button variant="primary" size="lg" asChild className="bg-[#e07a3d] hover:bg-[#d16a2d] shadow-[0_2px_8px_rgba(224,122,61,0.25)] hover:shadow-[0_8px_24px_rgba(224,122,61,0.3)] hover:-translate-y-0.5">
              <Link href="/signup">Sign Up for OnePrice</Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="bg-white/10 text-white border-white/15 hover:bg-white/15 hover:border-white/25"
            >
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
          <p className="text-xs text-white/40 mt-6 font-sans">
            You&apos;ll receive your warehouse addresses immediately after signup
          </p>
        </div>
      </section>
    </>
  );
}
