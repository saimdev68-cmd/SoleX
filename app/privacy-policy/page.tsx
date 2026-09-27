import React from "react";
import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SoleX",
  description: "SoleX privacy and data protection principles for our portfolio e-commerce demo.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
      <div className="mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
          Transparency & Trust
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-400">
          Last revised: September 2026 · Demo Environment Notice
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200/80 p-8 shadow-card space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed">
        <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 text-orange-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Portfolio Demonstration Application</strong>
            <span>
              This website is a frontend portfolio demonstration project for SoleX. No actual personal data is transmitted to external advertising networks or sold to third parties. All session state, shopping cart contents, and simulated orders exist strictly within your local browser storage.
            </span>
          </div>
        </div>

        <h2 className="text-base font-bold text-zinc-950 pt-2">1. Information Stored Locally</h2>
        <p>
          To deliver a realistic modern e-commerce experience, SoleX uses browser <code>localStorage</code> to store:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your shopping bag items, selected sizes, and quantities</li>
          <li>Your saved sneaker wishlist preferences</li>
          <li>Simulated member credentials (demo name, email, shipping address)</li>
          <li>Simulated order records for viewing in your Account dashboard</li>
        </ul>

        <h2 className="text-base font-bold text-zinc-950 pt-2">2. No Real Payment Processing</h2>
        <p>
          SoleX does not collect, transmit, or store real credit card numbers, debit card details, or banking authentication. The only delivery option provided is simulated Cash on Delivery (COD), ensuring zero financial transactions ever occur on this website.
        </p>

        <h2 className="text-base font-bold text-zinc-950 pt-2">3. Browser Cache & Data Reset</h2>
        <p>
          You maintain complete authority over your browser data. You can clear your simulated cart, orders, and saved wishlist at any time simply by clearing your browser cookies/local storage or using the &ldquo;Sign Out&rdquo; and &ldquo;Clear Bag&rdquo; actions within the application.
        </p>

        <h2 className="text-base font-bold text-zinc-950 pt-2">4. Contact Inquiries</h2>
        <p>
          For questions regarding the frontend codebase, architecture, or design system, please reach out via our contact page.
        </p>
      </div>
    </div>
  );
}
