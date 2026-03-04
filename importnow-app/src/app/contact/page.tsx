import { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact Us - Get Free Quote | ImportNow",
  description:
    "Get in touch with ImportNow for a free quote on China to India imports. We're here to answer your questions and help you get started.",
  keywords: [
    "contact ImportNow",
    "free quote import",
    "China import consultation",
  ],
  openGraph: {
    title: "Contact Us - ImportNow",
    description:
      "Get in touch with ImportNow for a free quote on China to India imports. We're here to answer your questions and help you get started.",
    url: "https://importnow.in/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - ImportNow",
    description:
      "Get in touch with ImportNow for a free quote on China to India imports.",
  },
  alternates: {
    canonical: "https://importnow.in/contact",
  },
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "info@importnow.in",
    link: "mailto:info@importnow.in",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "9989724320",
    link: "tel:+919989724320",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Hyderabad and Delhi, India",
    link: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon - Sat: 9AM - 6PM IST",
    link: null,
  },
];

export default function ContactPage() {
  const baseUrl = "https://importnow.in";
  const pageUrl = `${baseUrl}/contact`;

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Contact Us", url: pageUrl },
  ]);

  // WebPage structured data
  const webPageSchema = generateWebPageSchema({
    name: "Contact Us - ImportNow",
    description:
      "Get in touch with ImportNow for a free quote on China to India imports.",
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: baseUrl },
      { name: "Contact Us", url: pageUrl },
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
              <MessageCircle className="h-5 w-5 text-[#0B1F33]" />
              <span className="text-sm font-medium text-[#0B1F33]">Contact Us</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2933] mb-6">
              Let&apos;s <span className="text-[#0B1F33]">Partner Up</span>
            </h1>

            <p className="text-xl text-[#666666]">
              Ready to simplify your imports? Get in touch for a free consultation 
              and custom quote tailored to your needs.
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

      {/* Contact Form & Info */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-[#1F2933] mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-[#666666] mb-8">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                  
                  <ContactForm />
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#1F2933] mb-6">
                    Contact Information
                  </h2>
                  
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4"
                    >
                      <div className="h-12 w-12 rounded-xl bg-[#F5F7FA] flex items-center justify-center shrink-0">
                        <item.icon className="h-6 w-6 text-[#0B1F33]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1F2933]">{item.title}</h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-[#0B1F33] hover:underline"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-[#666666]">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Trust Indicators */}
                  <div className="bg-[#0B1F33] rounded-xl p-6 text-white">
                    <h3 className="font-semibold mb-4">Why Contact Us?</h3>
                    <ul className="space-y-2 text-sm text-white/90">
                      <li className="flex items-center gap-2">
                        <span>✓</span> Free consultation & quote
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> Response within 24 hours
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> No obligation to proceed
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> Expert import guidance
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#1F2933] mb-4">
              Our Presence
            </h2>
            <p className="text-[#666666] mb-8">
              With teams in India and China, we&apos;re positioned to serve you across 
              the entire import journey.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F5F7FA] rounded-xl p-8 text-center">
                <span className="text-5xl mb-4 block">🇮🇳</span>
                <h3 className="text-xl font-semibold text-[#1F2933] mb-2">India Office</h3>
                <p className="text-[#666666]">Hyderabad and Delhi</p>
                <p className="text-sm text-[#888888] mt-2">
                  Customs & logistics coordination
                </p>
              </div>

              <div className="bg-[#F5F7FA] rounded-xl p-8 text-center">
                <span className="text-5xl mb-4 block">🇨🇳</span>
                <h3 className="text-xl font-semibold text-[#1F2933] mb-2">China Team</h3>
                <p className="text-[#666666]">Shenzhen, Guangzhou, Yiwu and Shanghai</p>
                <p className="text-sm text-[#888888] mt-2">
                  Sourcing & quality inspection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


