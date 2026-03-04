"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQ[];
}

interface FAQAccordionProps {
  faqs: FAQCategory[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div className="space-y-12">
      {faqs.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h2 className="text-2xl font-bold text-[#1F2933] mb-6">
            {category.category}
          </h2>
          <Accordion type="single">
            {category.questions.map((faq, faqIndex) => {
              const itemId = `${categoryIndex}-${faqIndex}`;
              return (
                <AccordionItem key={itemId} value={itemId}>
                  <AccordionTrigger value={itemId}>
                    <h3 className="text-left font-medium">{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent value={itemId}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      ))}
    </div>
  );
}


