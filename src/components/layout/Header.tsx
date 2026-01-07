"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Services",
    href: "/services",
    hasDropdown: true,
    children: [
      { name: "Brand Building", href: "/services#brand-building" },
      { name: "Product Sourcing", href: "/services#sourcing" },
      { name: "Quality Inspection", href: "/services#inspection" },
      { name: "Logistics", href: "/services#logistics" },
    ],
  },
  { name: "OnePrice", href: "/oneprice" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isOnePricePage = pathname === "/oneprice";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
      className={cn(
        "transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white"
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/Gemini_Generated_Image_5a2lkj5a2lkj5a2l (1).png"
              alt="ImportNow"
              width={675}
              height={203}
              className="h-[162px] md:h-[216px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Hidden on OnePrice page */}
          {!isOnePricePage && (
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-[#0B1F33] bg-[#F5F7FA]"
                        : "text-[#1F2933] hover:text-[#0B1F33] hover:bg-[#F5F7FA]"
                    )}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          activeDropdown === item.name && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2 w-56">
                      <div className="bg-white rounded-xl shadow-xl border border-[#e5e7eb] overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-[#1F2933] hover:bg-[#F5F7FA] hover:text-[#0B1F33] transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Desktop CTA - Login button on OnePrice page, Quote button otherwise */}
          <div className="hidden lg:flex items-center">
            {isOnePricePage ? (
              <Button
                variant="primary"
                size="md"
                className="bg-[#0B1F33] hover:bg-[#081620] text-white font-semibold px-6 py-2 rounded-lg"
                asChild
              >
                <a href="https://oneprice.importnow.in/sign-in" target="_blank" rel="noopener noreferrer">Login</a>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                className="bg-[#0B1F33] hover:bg-[#081620] text-white font-semibold px-6 py-2 rounded-lg"
                asChild
              >
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            )}
          </div>

          {/* Mobile: New Service Button + Menu Button - Hidden on OnePrice page */}
          {!isOnePricePage && (
            <div className="lg:hidden flex items-center gap-2">
              {/* New Service Badge */}
              <Link
                href="/oneprice"
                className="relative inline-flex items-center gap-1.5 bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] border border-[#fed7aa] px-3 py-1.5 rounded-full text-xs font-medium text-[#c2410c] shadow-[0_0_12px_rgba(251,146,60,0.3)] hover:shadow-[0_0_18px_rgba(251,146,60,0.4)] transition-shadow"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#f97316]"></span>
                </span>
                New Service
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#1F2933] hover:text-[#0B1F33] transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          )}

          {/* Mobile Login Button - Show on OnePrice page */}
          {isOnePricePage && (
            <div className="lg:hidden">
              <Button
                variant="primary"
                size="md"
                className="bg-[#0B1F33] hover:bg-[#081620] text-white font-semibold px-4 py-2 rounded-lg"
                asChild
              >
                <a href="https://oneprice.importnow.in/sign-in" target="_blank" rel="noopener noreferrer">Login</a>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation - Hidden on OnePrice page */}
        {!isOnePricePage && (
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300",
              isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="py-4 space-y-1 border-t border-[#e5e7eb] bg-white">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-[#0B1F33] bg-[#F5F7FA]"
                        : "text-[#1F2933] hover:text-[#0B1F33] hover:bg-[#F5F7FA]"
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-[#666666] hover:text-[#0B1F33] hover:bg-[#F5F7FA] rounded-lg transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 px-4">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full bg-[#0B1F33] hover:bg-[#081620] text-white font-semibold"
                  asChild
                >
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


