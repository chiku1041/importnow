"use client";

import { Briefcase, Award } from "lucide-react";

export function WhyDifferentSection() {
  return (
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
  );
}




