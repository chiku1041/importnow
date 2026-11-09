"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ContactInfoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F5F7FA] section-padding">
      <div className="container-custom">
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-4">
              Get in <span className="text-[#0B1F33]">Touch</span>
            </h2>
            <p className="text-lg text-[#666666]">
              Reach out to our import export consultant team in Hyderabad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-[#0B1F33] flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#1F2933] mb-2">Phone</h3>
              <a
                href="tel:+919989724320"
                className="text-[#0B1F33] hover:underline text-lg font-medium"
              >
                +91 9989724320
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-[#0B1F33] flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#1F2933] mb-2">Email</h3>
              <a
                href="mailto:hello@Importnow.in"
                className="text-[#0B1F33] hover:underline text-lg font-medium"
              >
                hello@Importnow.in
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-[#0B1F33] flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#1F2933] mb-2">Offices</h3>
              <p className="text-[#666666] text-sm">
                Hyderabad, India
                <br />
                Shenzhen, Guangzhou, Yiwu & Shanghai, China
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
