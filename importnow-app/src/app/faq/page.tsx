import { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - ImportNow FAQ",
  description:
    "Find answers to common questions about importing from China to India with ImportNow. Learn about our services, OnePrice, shipping, customs, and more.",
  keywords: [
    "import FAQ",
    "China import questions",
    "importing from China",
    "customs clearance FAQ",
  ],
  openGraph: {
    title: "Frequently Asked Questions - ImportNow",
    description:
      "Find answers to common questions about importing from China to India with ImportNow.",
    url: "https://importnow.in/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions - ImportNow",
    description:
      "Find answers to common questions about importing from China to India with ImportNow.",
  },
  alternates: {
    canonical: "https://importnow.in/faq",
  },
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What does ImportNow do?",
        answer:
          "ImportNow is your end-to-end partner for importing goods from China to India. We handle everything from product sourcing and manufacturer verification to quality inspection, logistics, and customs clearance. Our goal is to simplify the import process so you can focus on growing your business.",
      },
      {
        question: "Who is ImportNow for?",
        answer:
          "We work with D2C brands expanding their product lines, Amazon and Flipkart sellers scaling inventory, professional importers streamlining operations, and businesses sourcing directly from manufacturers. Whether you're a first-time importer or an experienced buyer, we have solutions for you.",
      },
      {
        question: "How is ImportNow different from other sourcing agents?",
        answer:
          "Unlike traditional sourcing agents, we're true partners invested in your success. We offer transparent pricing with no hidden fees, modular services so you only pay for what you need, on-ground presence in China, and comprehensive support from sourcing to delivery.",
      },
      {
        question: "What categories do you handle?",
        answer:
          "We have experience across electronics, consumer products, medical devices, home & kitchen, fashion & accessories, industrial equipment, toys & games, sports & outdoor gear, and more. If you're unsure about your category, just ask us.",
      },
    ],
  },
  {
    category: "Services",
    questions: [
      {
        question: "What services does ImportNow offer?",
        answer:
          "Our core services include: Brand Building (product design, packaging, private labeling), Product Sourcing (manufacturer identification, negotiation, verification), Quality Inspection (pre-shipment checks, factory audits), Supply Chain & Logistics (freight forwarding, shipping, warehousing), and Customs Clearance (documentation, duty calculation, compliance).",
      },
      {
        question: "Do I have to use all your services?",
        answer:
          "No, our services are modular. You can choose exactly what you need and skip what you don't. Whether you need just sourcing, only inspection, or the full end-to-end package — we adapt to your requirements.",
      },
      {
        question: "Can you help me visit factories in China?",
        answer:
          "Yes! We arrange and guide factory visits for our clients. We'll help with travel coordination, factory scheduling, provide on-ground support, and even translator services if needed. It's a great way to build direct relationships with your suppliers.",
      },
      {
        question: "Do you help with product design and branding?",
        answer:
          "Absolutely. Our brand building service includes product design consultation, packaging design support, private labeling assistance, and brand positioning guidance. We help you create products that stand out in the market.",
      },
    ],
  },
  {
    category: "OnePrice",
    questions: [
      {
        question: "What is OnePrice?",
        answer:
          "OnePrice is our simplified import service designed for first-time and small-volume importers. You get one consolidated, upfront price that includes everything — sourcing, shipping, customs, and delivery. No hidden fees, no surprises.",
      },
      {
        question: "Who should use OnePrice?",
        answer:
          "OnePrice is perfect for first-time importers testing the waters, small orders under ₹1,00,000, personal imports, and anyone who values simplicity and predictable costs over complex negotiations.",
      },
      {
        question: "What's the maximum order value for OnePrice?",
        answer:
          "OnePrice is designed for shipments up to ₹1,00,000. For orders exceeding $1000 in value, we recommend discussing your needs with our team for a customized solution.",
      },
      {
        question: "Which countries does OnePrice support?",
        answer:
          "Currently, OnePrice supports imports from China. We're expanding to support 7 countries soon — you'll see all available options in your portal after signup.",
      },
      {
        question: "How do I track my OnePrice shipment?",
        answer:
          "After placing your order, you'll have access to our tracking portal with real-time status updates. You'll see clear milestones from sourcing to delivery, with estimated timelines for each stage.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        question: "How does pricing work?",
        answer:
          "For our full services, we provide custom quotes based on your specific requirements. For OnePrice, you get an all-inclusive price upfront. We believe in transparent pricing — you'll always know what you're paying for before you commit.",
      },
      {
        question: "Are there hidden fees?",
        answer:
          "No hidden fees, ever. We're upfront about all costs. Your quote includes everything discussed, and we'll clearly communicate any potential additional costs (like unexpected customs duties) before they occur.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers, and for certain services, online payment options. Specific payment terms and methods will be discussed during the quotation process based on your order size and requirements.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Shipping times vary based on the method chosen and order complexity. Typically, sea freight takes 25-35 days, while air freight takes 7-15 days. We'll provide estimated timelines with your quote and keep you updated throughout the process.",
      },
      {
        question: "Do you handle customs clearance?",
        answer:
          "Yes, customs clearance is one of our core services. Our established network in India ensures smooth clearance. We handle documentation preparation, duty calculation, customs liaison, and compliance assurance.",
      },
      {
        question: "Can you deliver to my warehouse/address?",
        answer:
          "Yes, we provide door-to-door delivery services. Your products can be delivered directly to your warehouse, office, or any specified address in India.",
      },
    ],
  },
  {
    category: "Quality & Reliability",
    questions: [
      {
        question: "How do you ensure product quality?",
        answer:
          "We conduct thorough quality inspections at multiple stages: during production (if applicable), pre-shipment, and before dispatch. Our team performs physical checks, reviews specifications, and documents everything with detailed reports and photos.",
      },
      {
        question: "What if there's a quality issue?",
        answer:
          "If our inspection reveals quality issues, we work with the supplier to resolve them before shipping. If issues are discovered after delivery, we'll help mediate with the supplier. Our established relationships give us leverage to ensure fair resolutions.",
      },
      {
        question: "How do you verify manufacturers?",
        answer:
          "Our 5+ years of experience and 1000+ manufacturer relationships give us deep knowledge of reliable suppliers. We verify business licenses, conduct factory visits, check production capabilities, and review track records before recommending any supplier.",
      },
    ],
  },
];

export default function FAQPage() {
  const baseUrl = "https://importnow.in";
  const pageUrl = `${baseUrl}/faq`;

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "FAQ", url: pageUrl },
  ]);

  // WebPage structured data
  const webPageSchema = generateWebPageSchema({
    name: "Frequently Asked Questions - ImportNow",
    description:
      "Find answers to common questions about importing from China to India with ImportNow.",
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: baseUrl },
      { name: "FAQ", url: pageUrl },
    ],
  });

  // FAQPage structured data
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((category) =>
      category.questions.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      }))
    ),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema),
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
              <HelpCircle className="h-5 w-5 text-[#0B1F33]" />
              <span className="text-sm font-medium text-[#0B1F33]">FAQ</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2933] mb-6">
              Frequently Asked <span className="text-[#0B1F33]">Questions</span>
            </h1>

            <p className="text-xl text-[#666666]">
              Find answers to common questions about importing with ImportNow
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

      {/* FAQ Sections */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Still Have <span className="text-[#0B1F33]">Questions</span>?
            </h2>
            <p className="text-lg text-[#666666] mb-8">
              Can&apos;t find what you&apos;re looking for? Our team is happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


