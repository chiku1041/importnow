import { Metadata } from "next";
import { Shield } from "lucide-react";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Privacy Policy - ImportNow",
  description:
    "ImportNow's privacy policy - how we collect, use, and protect your personal information.",
  keywords: ["privacy policy", "data protection", "privacy"],
  openGraph: {
    title: "Privacy Policy - ImportNow",
    description:
      "ImportNow's privacy policy - how we collect, use, and protect your personal information.",
    url: "https://importnow.in/privacy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - ImportNow",
    description:
      "ImportNow's privacy policy - how we collect, use, and protect your personal information.",
  },
  alternates: {
    canonical: "https://importnow.in/privacy",
  },
};

export default function PrivacyPage() {
  const baseUrl = "https://importnow.in";
  const pageUrl = `${baseUrl}/privacy`;

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Privacy Policy", url: pageUrl },
  ]);

  // WebPage structured data
  const webPageSchema = generateWebPageSchema({
    name: "Privacy Policy - ImportNow",
    description:
      "ImportNow's privacy policy - how we collect, use, and protect your personal information.",
    url: pageUrl,
    breadcrumb: [
      { name: "Home", url: baseUrl },
      { name: "Privacy Policy", url: pageUrl },
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
              <Shield className="h-5 w-5 text-[#0B1F33]" />
              <span className="text-sm font-medium text-[#0B1F33]">Legal</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2933] mb-6">
              Privacy <span className="text-[#0B1F33]">Policy</span>
            </h1>

            <p className="text-xl text-[#666666]">
              Last updated: December 30, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F5F7FA] section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-[#1F2933] mb-4">1. Introduction</h2>
              <p className="text-[#666666] mb-6">
                ImportNow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-bold text-[#1F2933] mb-4">2. Information We Collect</h2>
              <p className="text-[#666666] mb-4">
                We may collect information about you in various ways, including:
              </p>
              <ul className="list-disc list-inside text-[#666666] mb-6 space-y-2">
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone number, 
                  company name, and billing information you provide when contacting us 
                  or using our services.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you interact with 
                  our website, including IP address, browser type, pages visited, and 
                  time spent on pages.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies and similar tracking technologies 
                  to enhance your experience on our website.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-[#1F2933] mb-4">3. How We Use Your Information</h2>
              <p className="text-[#666666] mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-[#666666] mb-6 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process your inquiries and requests</li>
                <li>Send you updates, newsletters, and marketing communications</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#1F2933] mb-4">4. Sharing Your Information</h2>
              <p className="text-[#666666] mb-6">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information with trusted service providers who assist us 
                in operating our website and conducting our business, subject to 
                confidentiality agreements.
              </p>

              <h2 className="text-2xl font-bold text-[#1F2933] mb-4">5. Data Security</h2>
              <p className="text-[#666666] mb-6">
                We implement appropriate technical and organizational security measures 
                to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission 
                over the Internet is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-[#1F2933] mb-4">6. Your Rights</h2>
              <p className="text-[#666666] mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-[#666666] mb-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#1F2933] mb-4">7. Third-Party Links</h2>
              <p className="text-[#666666] mb-6">
                Our website may contain links to third-party websites. We are not 
                responsible for the privacy practices or content of these websites. 
                We encourage you to review the privacy policies of any third-party 
                sites you visit.
              </p>

              <h2 className="text-2xl font-bold text-[#1F2933] mb-4">8. Changes to This Policy</h2>
              <p className="text-[#666666] mb-6">
                We may update this Privacy Policy from time to time. We will notify 
                you of any changes by posting the new Privacy Policy on this page 
                and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="text-2xl font-bold text-[#1F2933] mb-4">9. Contact Us</h2>
              <p className="text-[#666666]">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-none text-[#666666] mt-4 space-y-2">
                <li>Email: <a href="mailto:info@importnow.in" className="text-[#0B1F33] hover:underline">info@importnow.in</a></li>
                <li>Phone: 9989724320</li>
                <li>Address: Hyderabad and Delhi, India</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


