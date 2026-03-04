"use client";

import { Check, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const experiencePoints = [
  "Over 5 years of specialized China import experience",
  "Hundreds of factory, warehouse, and office visits",
  "Strong relationships with 1000+ manufacturers across categories",
  "On-ground team in China and robust customs network in India",
  "We arrange and guide travel for factory visits when needed",
];

const testimonials = [
  {
    quote: "ImportNow made sourcing effortless. Their team handled everything from finding suppliers to quality checks.",
    author: "D2C Electronics Founder",
    company: "Mumbai",
  },
  {
    quote: "Finally, a partner who understands the import process. Transparent pricing and reliable delivery.",
    author: "Amazon Seller",
    company: "Delhi",
  },
  {
    quote: "Their on-ground presence in China gives us confidence. No more worrying about supplier reliability.",
    author: "Consumer Products Importer",
    company: "Bangalore",
  },
];

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F5F7FA] section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Experience Points */}
          <div>
            <h2
              className={`text-3xl md:text-4xl font-bold text-[#1F2933] mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              Built on <span className="text-[#0B1F33]">Real Experience</span>
            </h2>

            <ul className="space-y-4">
              {experiencePoints.map((point, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="h-6 w-6 rounded-full bg-[#0B1F33] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[#1F2933]">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonials Carousel */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg relative">
              <Quote className="h-12 w-12 text-[#1F3A5F] absolute top-6 right-6" />
              
              <div className="min-h-[180px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      activeTestimonial === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 absolute"
                    }`}
                  >
                    <p className="text-lg text-[#1F2933] italic mb-6 leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold text-[#0B1F33]">{testimonial.author}</p>
                      <p className="text-sm text-[#666666]">{testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Navigation */}
              <div className="flex gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeTestimonial === index
                        ? "w-8 bg-[#0B1F33]"
                        : "w-2 bg-[#1F3A5F] hover:bg-[#0B1F33]"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


