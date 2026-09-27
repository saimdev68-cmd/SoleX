import React from "react";
import { Info } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions of Use — SoleX",
  description: "SoleX Terms of Service and portfolio demonstration guidelines.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
      <div className="mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-zinc-400">
          Effective Date: September 2026 · SoleX Footwear Demo
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200/80 p-8 shadow-card space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed">
        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Demo Notice & Disclaimer</strong>
            <span>
              SoleX is a concept portfolio footwear e-commerce application developed to showcase high-performance scroll kinematic sequences, responsive product galleries, and complete client-side checkout architecture. No physical footwear is distributed, and no monetary transactions are processed.
            </span>
          </div>
        </div>

        <h2 className="text-base font-bold text-zinc-950 pt-2">1. Use of the Site</h2>
        <p>
          By interacting with this website, you are granted a non-exclusive license to test and explore the user interface, browse sneaker models, simulate purchases using Cash on Delivery, and evaluate technical frontend workflows.
        </p>

        <h2 className="text-base font-bold text-zinc-950 pt-2">2. Products & Specifications</h2>
        <p>
          Product descriptions, cushioning specs, colorway renderings, and simulated prices are generated for demonstrative showcase purposes.
        </p>

        <h2 className="text-base font-bold text-zinc-950 pt-2">3. Orders and Fulfillment</h2>
        <p>
          Placing an order on this website generates a simulated unique order identifier (e.g. <code>SLX-20260927-001</code>) and stores the purchase record strictly within client memory. No physical dispatch, carrier transit, or courier collection will take place.
        </p>

        <h2 className="text-base font-bold text-zinc-950 pt-2">4. User Accounts</h2>
        <p>
          You are welcome to create demo member profiles or utilize the &ldquo;Instant One-Click Demo Sign In&rdquo;. Passwords entered into demo forms are handled strictly on the client side and are never submitted to an external database.
        </p>

        <h2 className="text-base font-bold text-zinc-950 pt-2">5. Intellectual Property</h2>
        <p>
          The SoleX wordmark, interactive 240-frame sequence implementation, and responsive layout styling are created for developer portfolio presentation.
        </p>
      </div>
    </div>
  );
}
