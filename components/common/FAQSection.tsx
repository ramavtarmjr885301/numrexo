"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export default function FAQSection({ items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="bg-surface border border-hairline rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center p-5 text-left font-semibold hover:bg-cream transition-colors"
          >
            <span className="text-sm md:text-base text-ink">{item.q}</span>
            <ChevronDown
              size={18}
              className={`text-ink-faint transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 pb-5 text-sm text-ink-soft leading-relaxed border-t border-hairline pt-4">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
