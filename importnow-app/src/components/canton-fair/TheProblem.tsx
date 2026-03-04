"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

const problems = [
    "They attend the wrong phase",
    "They speak to traders, not factories",
    "They overpay for travel and stay",
    "They collect samples but no clear next steps",
];

export function TheProblem() {
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
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Problem Statement */}
                        <div
                            className={`transition-all duration-700 ${isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-8"
                                }`}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-6">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <span className="text-sm font-medium text-red-600">
                                    Common Pitfalls
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] mb-6">
                                Why Most Indian Visitors{" "}
                                <span className="text-red-600">Don&apos;t Get Results</span>
                            </h2>

                            <p className="text-lg text-[#666666]">
                                Canton Fair doesn&apos;t fail people.{" "}
                                <span className="font-semibold text-[#1F2933]">
                                    Poor planning does.
                                </span>
                            </p>
                        </div>

                        {/* Right - Problem List */}
                        <div
                            className={`transition-all duration-700 delay-200 ${isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-8"
                                }`}
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <ul className="space-y-4">
                                    {problems.map((problem, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-4 p-4 bg-red-50 rounded-xl"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 text-sm font-bold">
                                                ✗
                                            </div>
                                            <span className="text-[#1F2933] font-medium">
                                                {problem}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
