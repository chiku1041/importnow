import { Metadata } from "next";
import {
  Zap,
  Speaker,
  Magnet,
  Smartphone,
  Palette,
  Shield,
  Layers,
  Factory,
  Tag,
  Truck,
  TrendingUp,
  ArrowRight,
  Check,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import { ProductGallery } from "./ProductGallery";
import { ContactFormSection } from "./ContactFormSection";

export const metadata: Metadata = {
  title: "6-in-1 Pixel Animation BT Speaker Alarm Clock | Import from China",
  description:
    "Import the trending 6-in-1 Pixel Animation BT Speaker with Wireless Charger Stand directly from China to India. Custom branding available through ImportNow's one-stop import solution.",
  keywords: [
    "wireless charger",
    "bluetooth speaker",
    "alarm clock",
    "pixel animation",
    "import from China",
    "white label",
    "custom branding",
    "ImportNow",
    "India import",
  ],
  openGraph: {
    title: "6-in-1 Pixel Animation BT Speaker - Import with ImportNow",
    description:
      "Revolutionize your desk with this multifunctional gadget. Import directly from China with custom branding.",
    url: "https://importnow.in/products/pixel-speaker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "6-in-1 Pixel Animation BT Speaker - Import with ImportNow",
    description:
      "Revolutionize your desk with this multifunctional gadget. Import directly from China with custom branding.",
  },
  alternates: {
    canonical: "https://importnow.in/products/pixel-speaker",
  },
};

const features = [
  {
    icon: Layers,
    title: "6-in-1 Integration",
    description:
      "Wireless charger, BT speaker, alarm clock, holder, lamp & magnetic stand – all in one compact device.",
  },
  {
    icon: Zap,
    title: "Pixel Animation Display",
    description:
      "Eye-catching LED pixel animations add a modern aesthetic while displaying time, notifications, and custom graphics.",
  },
  {
    icon: Magnet,
    title: "Magnetic Attachment",
    description:
      "Strong magnetic alignment ensures perfect positioning for optimal wireless charging every time.",
  },
  {
    icon: Zap,
    title: "Fast Charging",
    description:
      "Supports 15W, 10W, 7.5W, and 5W output powers – compatible with all Qi-enabled devices.",
  },
  {
    icon: Smartphone,
    title: "Universal Compatibility",
    description:
      "Works with iPhones, Android phones, AirPods, Galaxy Buds, Apple Watch, and other smart wearables.",
  },
  {
    icon: Speaker,
    title: "Premium BT Speaker",
    description:
      "High-fidelity Bluetooth speaker for music, alarms, and hands-free calls with impressive sound quality.",
  },
  {
    icon: Palette,
    title: "Private Mold Design",
    description:
      "Unique design with white-labeling options – customize with your brand logo via ImportNow's services.",
  },
  {
    icon: Shield,
    title: "Certified Quality",
    description:
      "FCC, Qi, RoHS, and CE certified for safety and quality assurance with 12-month warranty.",
  },
];

const specifications = [
  { label: "Model Number", value: "WC107" },
  { label: "Dimensions", value: "20 × 15 × 10 cm" },
  { label: "Weight", value: "0.600 kg (600g)" },
  { label: "Materials", value: "ABS Plastic + Aluminum Alloy" },
  { label: "Wireless Charging Output", value: "15W / 10W / 7.5W / 5W (Qi Standard)", highlight: true },
  { label: "Bluetooth Version", value: "Bluetooth 5.0" },
  { label: "Speaker Output", value: "3W × 2" },
  { label: "Certifications", value: "FCC, Qi, RoHS, CE", highlight: true },
  { label: "Origin", value: "Shenzhen, China" },
  { label: "Default Brand", value: "CHARGED4LIFE (White-label available)" },
  { label: "Warranty", value: "12 Months", highlight: true },
  { label: "MOQ", value: "30+ pieces (Negotiable)" },
];

const benefits = [
  {
    icon: Factory,
    title: "Direct from Manufacturer",
    description:
      "Skip middlemen and source directly from Shenzhen factories. Get authentic products at competitive prices with ImportNow's verified supplier network.",
  },
  {
    icon: Tag,
    title: "Custom Branding",
    description:
      "Launch your own brand with white-labeling services. Add your logo, customize packaging, and create a unique product identity for the Indian market.",
    badge: "White-Label Ready",
  },
  {
    icon: Truck,
    title: "One-Stop Import Solution",
    description:
      "From sourcing and quality inspection to shipping and customs clearance – ImportNow handles everything for seamless delivery to India.",
  },
  {
    icon: TrendingUp,
    title: "Exclusive Market Opportunity",
    description:
      "This gadget isn't available in India yet. Be among the first to introduce it to the market and capitalize on the demand for unique tech products.",
    badge: "Buy at $15-19, Resell at ₹3,000+",
  },
];

const steps = [
  {
    number: "1",
    title: "Enquire or Order",
    description:
      "Click 'Enquire Now' or 'Order Bulk' to share your requirements. Specify quantity, customization needs, and timeline.",
  },
  {
    number: "2",
    title: "Customize Your Brand",
    description:
      "Send your logo and branding guidelines. Our team coordinates with manufacturers for white-labeling and custom packaging.",
  },
  {
    number: "3",
    title: "ImportNow Handles Logistics",
    description:
      "We manage sourcing, quality inspection, shipping from China, and customs clearance – all in one seamless process.",
  },
  {
    number: "4",
    title: "Receive & Launch",
    description:
      "Your branded products arrive in India, ready for sale. Start selling online or retail with your own unique brand identity.",
  },
];

// Gallery images from Supabase
const galleryImages = [
  {
    src: "https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/6in1%20pixel%20gadget/H204d7e9779674a45b845bd95c375776an.png",
    alt: "6-in-1 Pixel Speaker - Front View",
    caption: "Front View - Pixel Animation Display",
  },
  {
    src: "https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/6in1%20pixel%20gadget/H239f5c7075e34112ac525b7ada7313fek.jpg",
    alt: "Wireless Charging in Action",
    caption: "Wireless Charging in Action",
  },
  {
    src: "https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/6in1%20pixel%20gadget/H2612059447ee43e38b923060ed671431y.png",
    alt: "Side Profile - Slim Design",
    caption: "Side Profile - Slim Design",
  },
  {
    src: "https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/6in1%20pixel%20gadget/H416285488dd6471d9966fe737e75c0c5q.png",
    alt: "Pixel Animation Display in Action",
    caption: "Pixel Animation Display in Action",
  },
  {
    src: "https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/6in1%20pixel%20gadget/H871763b205aa4ecda18fa0b3f8db07aah.jpg",
    alt: "Desktop Setup - Home Office",
    caption: "Desktop Setup - Home Office",
  },
  {
    src: "https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/6in1%20pixel%20gadget/Ha7f6c7952a184d4281285470eb09bc92S.jpg",
    alt: "Premium Packaging - Custom Branding Available",
    caption: "Premium Packaging - Custom Branding Available",
  },
];

export default function PixelSpeakerPage() {
  const baseUrl = "https://importnow.in";
  const pageUrl = `${baseUrl}/products/pixel-speaker`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Products", url: `${baseUrl}/products` },
    { name: "6-in-1 Pixel Speaker", url: pageUrl },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "6-in-1 Pixel Animation BT Speaker Alarm Clock | ImportNow",
    description:
      "Import the trending 6-in-1 Pixel Animation BT Speaker with Wireless Charger Stand directly from China to India.",
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: baseUrl },
      { name: "Products", url: `${baseUrl}/products` },
      { name: "6-in-1 Pixel Speaker", url: pageUrl },
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
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C56A2D]/10 to-[#C56A2D]/5 border border-[#C56A2D]/20 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C56A2D] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C56A2D]"></span>
                </span>
                <span className="text-sm font-medium text-[#C56A2D]">
                  Trending Product • Exclusive Import
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2933] mb-4 leading-tight">
                6-in-1 Pixel Animation BT Speaker Alarm Clock with{" "}
                <span className="text-[#0B1F33]">Wireless Charger Stand</span>
              </h1>

              <p className="text-lg text-[#666666] mb-6">
                Revolutionize your desk with this multifunctional gadget – Now
                available for import to India via ImportNow
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button variant="primary" size="lg" asChild>
                  <a href="https://wa.me/919989724320" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-5 w-5 mr-2" />
                    Enquire Now
                  </a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href="https://wa.me/919989724320?text=I%20want%20to%20order%20bulk" target="_blank" rel="noopener noreferrer">
                    <Truck className="h-5 w-5 mr-2" />
                    Order Bulk
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#666666]">
                <Check className="h-5 w-5 text-[#2E7F7A]" />
                <span>
                  <strong className="text-[#0B1F33]">Import directly from China</strong>{" "}
                  with custom branding for your new brand.
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative bg-gradient-to-br from-[#F5F7FA] to-[#E1E6ED] rounded-2xl aspect-[4/3] overflow-hidden shadow-xl">
                <Image
                  src="https://wuxxveyozgvblvhisszq.supabase.co/storage/v1/object/public/6in1%20pixel%20gadget/H204d7e9779674a45b845bd95c375776an.png"
                  alt="6-in-1 Pixel Animation BT Speaker Alarm Clock with Wireless Charger Stand"
                  fill
                  className="object-contain bg-white"
                  priority
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 right-4 bg-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#C56A2D]" />
                <span className="font-semibold text-[#0B1F33]">15W Fast Charging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-6">
              Product <span className="text-[#0B1F33]">Overview</span>
            </h2>

            <p className="text-lg text-[#666666] mb-6">
              This multifunctional 6-in-1 device is the ultimate desk companion,
              combining a{" "}
              <strong className="text-[#1F2933]">
                wireless charger, Bluetooth speaker, alarm clock, phone holder,
                ambient lamp, and magnetic stand
              </strong>{" "}
              with mesmerizing pixel animation – all in one sleek design.
            </p>

            <p className="text-lg text-[#666666] mb-6">
              Charge your phone, watch, and earphones simultaneously with
              industry-leading fast wireless charging technology. The vibrant
              pixel animation display adds a modern touch while the built-in
              Bluetooth speaker delivers crystal-clear audio for your music,
              calls, or podcasts.
            </p>

            <div className="bg-white border-l-4 border-[#C56A2D] p-6 rounded-r-xl text-left">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-[#C56A2D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#0B1F33] mb-1">
                    Exclusive Opportunity
                  </p>
                  <p className="text-[#666666]">
                    This product is not yet available in India. Import directly
                    through ImportNow&apos;s one-stop solution and launch your own
                    branded version in the Indian market with custom packaging
                    and logo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Key <span className="text-[#0B1F33]">Features</span>
            </h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Six essential functions, one intelligent device
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="default"
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#E1E6ED]"
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#0B1F33] to-[#1F3A5F] flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-[#C56A2D]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2933] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#666666]">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-[#1F3A5F] section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technical <span className="text-[#C56A2D]">Specifications</span>
            </h2>
            <p className="text-lg text-[#C9D4E0] max-w-2xl mx-auto">
              Detailed product information for informed decisions
            </p>
          </div>

          {/* Specs Table */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-[#0B1F33] rounded-2xl overflow-hidden">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 ${
                    index !== specifications.length - 1
                      ? "border-b border-[#1F3A5F]"
                      : ""
                  }`}
                >
                  <div className="p-4 bg-[#0B1F33]/50 font-medium text-white">
                    {spec.label}
                  </div>
                  <div
                    className={`p-4 ${
                      spec.highlight ? "text-[#C56A2D] font-medium" : "text-[#C9D4E0]"
                    }`}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Product <span className="text-[#0B1F33]">Gallery</span>
            </h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              See the product from every angle
            </p>
          </div>

          <ProductGallery images={galleryImages} />
        </div>
      </section>

      {/* Why Import with ImportNow */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Why Import This Gadget with{" "}
              <span className="text-[#0B1F33]">ImportNow</span>?
            </h2>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Your gateway to exclusive products and profitable business
              opportunities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                variant="default"
                className="p-6 hover:shadow-lg transition-all duration-300 border border-[#E1E6ED] group hover:border-[#2E7F7A]"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#2E7F7A] to-[#1F3A5F] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2933] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#666666] mb-3">{benefit.description}</p>
                {benefit.badge && (
                  <span className="inline-block bg-[#C56A2D]/10 text-[#C56A2D] px-3 py-1 rounded-full text-xs font-semibold">
                    {benefit.badge}
                  </span>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#0B1F33] section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It <span className="text-[#C56A2D]">Works</span>
            </h2>
            <p className="text-lg text-[#C9D4E0] max-w-2xl mx-auto">
              Four simple steps to launch your branded product in India
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#C56A2D] to-[#B85A25] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#C9D4E0]">{step.description}</p>

                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block h-6 w-6 text-[#2E7F7A] absolute top-6 -right-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <ContactFormSection />
    </>
  );
}
