"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Cash on Delivery",
    q: "How does Cash on Delivery (COD) work with SoleX?",
    a: "Cash on Delivery allows you to place an order without entering online payment or credit card details upfront. When our delivery courier arrives with your package, you can inspect the package and pay the exact order total in physical cash or via mobile payment terminal at your doorstep.",
  },
  {
    category: "Cash on Delivery",
    q: "Are there any additional surcharge fees for Cash on Delivery?",
    a: "No! SoleX does not add hidden COD handling surcharges. You pay exactly the price shown at checkout, with complimentary shipping applied if your order meets the $100 threshold.",
  },
  {
    category: "Shipping & Delivery",
    q: "How fast is express shipping?",
    a: "Orders placed before 2:00 PM EST are dispatched the same business day. Standard express courier delivery typically arrives within 2 to 4 business days depending on your postal destination.",
  },
  {
    category: "Shipping & Delivery",
    q: "How can I qualify for free delivery?",
    a: "All orders with a subtotal of $100 or greater qualify automatically for free express courier shipping. For orders under $100, a flat $10 delivery rate applies.",
  },
  {
    category: "Returns & Exchanges",
    q: "What is your 30-day return policy?",
    a: "We offer a 30-day hassle-free return window on unworn sneakers in their original box and packaging. If the size or aesthetic doesn't suit you, initiate an exchange through your account or contact our customer support for a prepaid return label.",
  },
  {
    category: "Sizing & Fit",
    q: "Do SoleX sneakers fit true to size?",
    a: "Yes. Our footwear is engineered according to standard US athletic shoe sizing. For wider feet or marathon runners who prefer thicker socks, we recommend selecting a half size up. View our interactive Size Guide for detailed CM and EU measurements.",
  },
  {
    category: "Products & Materials",
    q: "How should I clean and maintain my SoleX sneakers?",
    a: "For engineered knit uppers, use a soft bristle brush with warm water and mild soap. Air dry away from direct heat sources or high-temperature clothes dryers. Memory foam insoles can be gently washed separately.",
  },
  {
    category: "Account & Orders",
    q: "Can I place an order as a guest?",
    a: "You can freely browse products and add items to your shopping bag as a guest. When proceeding to checkout, creating a quick account or signing in allows you to save delivery addresses and access full local order history.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
      <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
          Frequently Asked Questions
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Help & Customer Knowledge
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Everything you need to know about SoleX footwear, delivery logistics, Cash on Delivery, and sizing.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-subtle transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-950">
                    {faq.q}
                  </h3>
                </div>
                <div
                  className={`p-2 rounded-full bg-zinc-50 text-zinc-600 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 bg-zinc-100" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100/80 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
