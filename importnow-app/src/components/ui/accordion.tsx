"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionProps {
  children: ReactNode;
  type?: "single" | "multiple";
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  children,
  type = "single",
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (value: string) => {
    if (type === "single") {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("space-y-3", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used within Accordion");

  const isOpen = context.openItems.includes(value);

  return (
    <div
      className={cn(
        "bg-white border border-[#e5e7eb] rounded-xl overflow-hidden transition-all duration-300",
        isOpen && "border-[#1F3A5F] shadow-md",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ value, children, className }: AccordionTriggerProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");

  const isOpen = context.openItems.includes(value);

  return (
    <button
      onClick={() => context.toggleItem(value)}
      className={cn(
        "flex w-full items-center justify-between px-6 py-4 text-left font-medium text-[#1F2933] transition-colors hover:bg-[#F5F7FA]",
        className
      )}
      aria-expanded={isOpen}
    >
      <span className="pr-4">{children}</span>
      <ChevronDown
        className={cn(
          "h-5 w-5 text-[#0B1F33] shrink-0 transition-transform duration-300",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

interface AccordionContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionContent({ value, children, className }: AccordionContentProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within Accordion");

  const isOpen = context.openItems.includes(value);

  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        <div className={cn("px-6 pb-4 text-[#666666] leading-relaxed", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}


