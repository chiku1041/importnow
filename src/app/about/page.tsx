import { Metadata } from "next";
import { Check, MapPin, Users, Award, Briefcase, Globe, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About Us - ImportNow | China to India Import Experts",
  description:
    "Learn about ImportNow - your reliable partner for China to India imports with 5+ years of experience, 1000+ manufacturer relationships, and on-ground presence in China.",
  keywords: [
    "about ImportNow",
    "China import company",
    "import experts India",
    "sourcing company",
  ],
  openGraph: {
    title: "About Us - ImportNow",
    description:
      "Learn about ImportNow - your reliable partner for China to India imports with 5+ years of experience, 1000+ manufacturer relationships, and on-ground presence in China.",
    url: "https://importnow.in/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - ImportNow",
    description:
      "Learn about ImportNow - your reliable partner for China to India imports with 5+ years of experience, 1000+ manufacturer relationships, and on-ground presence in China.",
  },
  alternates: {
    canonical: "https://importnow.in/about",
  },
};

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "Clear, upfront pricing with no hidden fees. You always know what you're paying for.",
  },
  {
    icon: Heart,
    title: "Partnership",
    description: "We're not just agents — we're invested partners in your import success.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "Rigorous inspection processes ensure you receive exactly what you ordered.",
  },
  {
    icon: Users,
    title: "Reliability",
    description: "Our vetted network of 1000+ manufacturers means consistent, dependable sourcing.",
  },
];

const experience = [
  "Over 5 years of specialized China import experience",
  "Hundreds of factory, warehouse, and office visits conducted",
  "Strong relationships with 1000+ manufacturers across categories",
  "On-ground team in China for real-time support",
  "Robust customs network in India for smooth clearance",
  "Travel arrangement and guidance for factory visits",
  "Brand development and product design support",
];

const caseStudies = [
  {
    title: "D2C Electronics Brand",
    category: "Electronics",
    result: "Reduced sourcing costs by 30%",
    description: "Helped establish direct manufacturer relationships, eliminating middlemen.",
  },
  {
    title: "Amazon Power Seller",
    category: "Consumer Goods",
    result: "Scaled inventory 5x",
    description: "Streamlined supply chain enabled rapid inventory expansion.",
  },
  {
    title: "Medical Devices Importer",
    category: "Medical",
    result: "100% compliance achieved",
    description: "Ensured all regulatory requirements were met with proper documentation.",
  },
];

export default function AboutPage() {
  const baseUrl = "https://importnow.in";
  const pageUrl = `${baseUrl}/about`;

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "About Us", url: pageUrl },
  ]);

  // WebPage structured data
  const webPageSchema = generateWebPageSchema({
    name: "About Us - ImportNow",
    description:
      "Learn about ImportNow - your reliable partner for China to India imports with 5+ years of experience, 1000+ manufacturer relationships, and on-ground presence in China.",
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: baseUrl },
      { name: "About Us", url: pageUrl },
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
              <span className="text-xl">🇮🇳</span>
              <span className="text-sm font-medium text-[#0B1F33]">About ImportNow</span>
              <span className="text-xl">🇨🇳</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2933] mb-6">
              Your Reliable <span className="text-[#0B1F33]">Import Partner</span>
            </h1>

            <p className="text-xl text-[#666666]">
              We exist to simplify importing from China to India, providing end-to-end 
              support with transparency, reliability, and a partnership mindset.
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

      {/* Our Story Section */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-6">
                Our <span className="text-[#0B1F33]">Story</span>
              </h2>
              
              <div className="space-y-4 text-[#666666]">
                <p>
                  ImportNow was born from a simple observation: Indian businesses 
                  deserve better than the chaos of traditional importing. Too many 
                  entrepreneurs waste time and money dealing with unreliable suppliers, 
                  hidden costs, and endless operational headaches.
                </p>
                <p>
                  With over 5 years of hands-on experience in China-India trade, 
                  we&apos;ve built a network and system that eliminates these pain points. 
                  We&apos;re not just another sourcing agent — we&apos;re your dedicated partner, 
                  invested in your success from first contact to final delivery.
                </p>
                <p>
                  Our on-ground presence in China, combined with deep expertise in 
                  Indian customs and logistics, means you get reliable, transparent, 
                  and efficient imports every time.
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-[#0B1F33] rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4">
                    <p className="text-4xl font-bold text-[#C56A2D]">5+</p>
                    <p className="text-[#C9D4E0]">Years Experience</p>
                  </div>
                  <div className="text-center p-4">
                    <p className="text-4xl font-bold text-[#C56A2D]">1000+</p>
                    <p className="text-[#C9D4E0]">Manufacturers</p>
                  </div>
                  <div className="text-center p-4">
                    <p className="text-4xl font-bold text-[#C56A2D]">100s</p>
                    <p className="text-[#C9D4E0]">Factory Visits</p>
                  </div>
                  <div className="text-center p-4">
                    <p className="text-4xl font-bold text-[#C56A2D]">24/7</p>
                    <p className="text-[#C9D4E0]">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Our <span className="text-[#0B1F33]">Values</span>
            </h2>
            <p className="text-lg text-[#666666]">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} variant="default" className="text-center">
                <div className="h-14 w-14 rounded-xl bg-[#F5F7FA] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-[#0B1F33]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2933] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[#666666]">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-8">
                Experience That <span className="text-[#0B1F33]">Matters</span>
              </h2>

              <ul className="space-y-4">
                {experience.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#0B1F33] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-[#1F2933]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="h-20 w-20 rounded-full bg-[#F5F7FA] flex items-center justify-center mx-auto mb-3">
                      <span className="text-4xl">🇨🇳</span>
                    </div>
                    <p className="font-semibold text-[#1F2933]">China</p>
                    <p className="text-sm text-[#666666]">On-ground team</p>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <div className="h-1 w-full bg-gradient-to-r from-[#0B1F33] to-[#1F3A5F] rounded-full relative">
                      <Globe className="h-8 w-8 text-[#0B1F33] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1" />
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="h-20 w-20 rounded-full bg-[#F5F7FA] flex items-center justify-center mx-auto mb-3">
                      <span className="text-4xl">🇮🇳</span>
                    </div>
                    <p className="font-semibold text-[#1F2933]">India</p>
                    <p className="text-sm text-[#666666]">Customs network</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-[#0B1F33]">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Seamless end-to-end operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Why We&apos;re <span className="text-[#0B1F33]">Different</span>
            </h2>
            <p className="text-lg text-[#666666]">
              We&apos;re not agents or traders — we&apos;re true partners in your import journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#F5F7FA] rounded-2xl p-8">
              <Briefcase className="h-10 w-10 text-[#0B1F33] mb-4" />
              <h3 className="text-xl font-semibold text-[#1F2933] mb-3">
                Partnership, Not Just Service
              </h3>
              <p className="text-[#666666]">
                We invest in understanding your business goals and work alongside you 
                to achieve them. Your success is our success.
              </p>
            </div>

            <div className="bg-[#F5F7FA] rounded-2xl p-8">
              <Award className="h-10 w-10 text-[#0B1F33] mb-4" />
              <h3 className="text-xl font-semibold text-[#1F2933] mb-3">
                Modular, No-Obligation Services
              </h3>
              <p className="text-[#666666]">
                Pick exactly what you need. Whether it&apos;s sourcing, inspection, or 
                full logistics — our services adapt to your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Success <span className="text-[#0B1F33]">Stories</span>
            </h2>
            <p className="text-lg text-[#666666]">
              See how we&apos;ve helped businesses like yours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <Card key={index} variant="default" className="bg-white">
                <div className="inline-block px-3 py-1 bg-[#F5F7FA] rounded-full text-sm text-[#0B1F33] font-medium mb-4">
                  {study.category}
                </div>
                <h3 className="text-lg font-semibold text-[#1F2933] mb-2">
                  {study.title}
                </h3>
                <p className="text-[#0B1F33] font-semibold mb-3">{study.result}</p>
                <p className="text-sm text-[#666666]">{study.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0B1F33] section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let&apos;s discuss how ImportNow can simplify your China imports
            </p>
            <Button
              size="lg"
              className="bg-white text-[#0B1F33] hover:bg-[#F5F7FA]"
              asChild
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}


