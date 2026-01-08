"use client";

import { useState, useEffect, useRef } from "react";
import { Plane, Building, MapPin, Train } from "lucide-react";

const days = [
  {
    day: "Day 1",
    title: "India to Guangzhou",
    objective: "Arrival, rest, mental reset before business days",
    icon: Plane,
    details: [
      "Flight from Chennai to Guangzhou via Kuala Lumpur (10-hour halt)",
      "Arrival in Guangzhou around 11 PM",
      "Hotel transfer and rest",
    ],
  },
  {
    day: "Day 2",
    title: "Canton Fair (Phase 1)",
    objective:
      "Learn how to navigate Canton Fair and start supplier conversations",
    icon: Building,
    details: [
      "Breakfast at hotel (included)",
      "Travel to Canton Fair exhibition",
      "Explore stalls individually based on your product interest",
      "Return to hotel by evening",
      "Group dinner and discussions at night",
    ],
    learnings: [
      "How to navigate Canton Fair without getting overwhelmed",
      "How to start conversations with suppliers",
      "What questions actually matter",
    ],
  },
  {
    day: "Day 3",
    title: "Canton Fair (Phase 1)",
    objective: "Shortlist suppliers and compare prices",
    icon: Building,
    details: [
      "Same schedule as Day 2",
      "Focus on shortlisting suppliers",
      "Comparing prices and MOQs",
      "Understanding product positioning",
    ],
  },
  {
    day: "Day 4",
    title: "Canton Fair (Phase 1)",
    objective: "Deep supplier evaluation and red flag identification",
    icon: Building,
    details: [
      "Same schedule as Day 2",
      "Reading quotations correctly",
      "Spotting red flags",
      "Identifying trading companies vs real factories",
    ],
  },
  {
    day: "Day 5",
    title: "Guangzhou City Tour",
    objective: "Cultural exposure and relationship building within the group",
    icon: MapPin,
    details: [
      "Visit Shamian Island",
      "Explore Guangzhou city",
      "Pearl River cruise at night",
      "Dinner and return to hotel",
    ],
    note: "Mental reset after intense exhibition days",
  },
  {
    day: "Day 6",
    title: "Shenzhen Electronics Hub",
    objective: "Understand China's electronics ecosystem",
    icon: Train,
    details: [
      "Bullet train from Guangzhou to Shenzhen",
      "Full-day visit to Huaqiangbei",
      "World's largest electronics market",
      "Evening dinner and hotel stay",
    ],
    learnings: [
      "How China's electronics ecosystem works",
      "Difference between market sourcing and factory sourcing",
      "Price layers, quality variations, and sourcing risks",
    ],
  },
  {
    day: "Day 7",
    title: "Return to India",
    objective: "Depart with contacts, samples, and actionable insights",
    icon: Plane,
    details: ["Flight from Shenzhen to Hyderabad via Kuala Lumpur"],
  },
];

export function DayByDayItinerary() {
  const [visibleDays, setVisibleDays] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-day-index") || "0"
            );
            setTimeout(() => {
              setVisibleDays((prev) => {
                if (!prev.includes(index)) {
                  return [...prev, index];
                }
                return prev;
              });
            }, index * 80);
          }
        });
      },
      { threshold: 0.1 }
    );

    const dayElements = sectionRef.current?.querySelectorAll("[data-day-index]");
    dayElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] sm:text-[32px] font-semibold text-[#0F172A] text-center mb-14 lg:mb-16">
          Day-by-Day Itinerary
        </h2>

        <div ref={sectionRef} className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[#E2E8F0] hidden sm:block"></div>

            <div className="space-y-6">
              {days.map((dayData, index) => {
                const Icon = dayData.icon;
                const isVisible = visibleDays.includes(index);

                return (
                  <div
                    key={index}
                    data-day-index={index}
                    className={`relative transition-all duration-300 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    {/* Timeline dot - hidden on mobile */}
                    <div className="absolute left-[11px] top-8 w-[18px] h-[18px] rounded-full bg-[#C53030] border-4 border-white shadow-sm z-10 hidden sm:block"></div>

                    {/* Card */}
                    <div className="sm:ml-12 bg-white border border-[#E2E8F0] rounded-lg p-5 lg:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 sm:hidden">
                          <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                            <Icon size={20} className="text-[#C53030]" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[#C53030] font-medium text-sm">
                              {dayData.day}
                            </span>
                            <Icon
                              size={16}
                              className="text-[#C53030] hidden sm:block"
                            />
                          </div>
                          <h3 className="text-[20px] lg:text-[22px] font-medium text-[#0F172A]">
                            {dayData.title}
                          </h3>
                        </div>
                      </div>

                      {/* Objective */}
                      <div className="bg-[#F8FAFC] rounded-md px-4 py-3 mb-4">
                        <p className="text-sm text-[#334155]">
                          <span className="font-medium">Objective:</span>{" "}
                          {dayData.objective}
                        </p>
                      </div>

                      {/* Details */}
                      <ul className="space-y-2 mb-4">
                        {dayData.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="text-[#334155] text-[15px] flex items-start gap-2"
                          >
                            <span className="text-[#C53030] mt-1.5 text-xs">
                              •
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Learnings (if any) */}
                      {dayData.learnings && (
                        <div className="border-t border-[#E2E8F0] pt-4 mt-4">
                          <p className="text-sm font-medium text-[#0F172A] mb-2">
                            What you learn:
                          </p>
                          <ul className="space-y-1.5">
                            {dayData.learnings.map((learning, lIndex) => (
                              <li
                                key={lIndex}
                                className="text-[#334155] text-sm flex items-start gap-2"
                              >
                                <span className="text-[#C53030] mt-1 text-xs">
                                  →
                                </span>
                                <span>{learning}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Note (if any) */}
                      {dayData.note && (
                        <div className="border-t border-[#E2E8F0] pt-4 mt-4">
                          <p className="text-sm text-[#64748B] italic">
                            {dayData.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
