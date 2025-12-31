import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "OnePrice", href: "/oneprice" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Shipping Policy", href: "/shipping" },
  ],
  services: [
    { name: "Product Sourcing", href: "/services#sourcing" },
    { name: "Quality Inspection", href: "/services#inspection" },
    { name: "Logistics", href: "/services#logistics" },
    { name: "Brand Building", href: "/services#brand-building" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0B1F33] text-white">
      <div className="container-custom section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              <Image
                src="/Gemini_Generated_Image_aj0fa8aj0fa8aj0f.png"
                alt="ImportNow"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-[#C9D4E0] mb-6 max-w-sm">
              Your trusted partner for seamless imports from China to India. We simplify 
              the complex so you can focus on growing your business.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@importnow.in"
                className="flex items-center gap-3 text-[#C9D4E0] hover:text-[#C56A2D] transition-colors"
              >
                <Mail className="h-5 w-5 text-[#C56A2D]" />
                info@importnow.in
              </a>
              <a
                href="tel:+919989724320"
                className="flex items-center gap-3 text-[#C9D4E0] hover:text-[#C56A2D] transition-colors"
              >
                <Phone className="h-5 w-5 text-[#C56A2D]" />
                +91 9989 724 320
              </a>
              <a
                href="tel:+8613025407345"
                className="flex items-center gap-3 text-[#C9D4E0] hover:text-[#C56A2D] transition-colors"
              >
                <Phone className="h-5 w-5 text-[#C56A2D]" />
                +86 1302 540 7345
              </a>
              <div className="flex items-center gap-3 text-[#C9D4E0]">
                <MapPin className="h-5 w-5 text-[#C56A2D]" />
                Hyderabad and Delhi, India
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#C9D4E0] hover:text-[#C56A2D] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#C9D4E0] hover:text-[#C56A2D] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#C9D4E0] hover:text-[#C56A2D] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-[#C9D4E0] text-sm">
              © {new Date().getFullYear()} ImportNow. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 text-[#C9D4E0] hover:text-[#C56A2D] hover:bg-white/10 rounded-full transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 text-[#C9D4E0] hover:text-[#C56A2D] hover:bg-white/10 rounded-full transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 text-[#C9D4E0] hover:text-[#C56A2D] hover:bg-white/10 rounded-full transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


