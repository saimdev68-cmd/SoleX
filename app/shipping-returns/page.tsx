import React from "react";
import { Truck, RotateCcw, ShieldCheck, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy — SoleX",
  description: "Official delivery terms, Cash on Delivery procedures, and 30-day returns policy.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
          Delivery & Returns
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Shipping & Return Policies
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Fast, reliable doorstep delivery with flexible Cash on Delivery and complimentary return exchanges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-950">Express Courier Delivery</h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            We partner with major express logistics couriers. All orders are packed in reinforced, moisture-resistant packaging and delivered directly to your doorstep in 2 to 4 business days.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-zinc-950">Cash on Delivery (COD)</h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Order without upfront digital payments. You have the right to inspect outer packaging before handing payment in cash or card to the courier delivery driver.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200/80 p-8 shadow-card space-y-6 text-xs sm:text-sm text-zinc-600 leading-relaxed">
        <h2 className="text-xl font-bold text-zinc-950">Domestic Shipping Rates</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-[11px] font-bold uppercase tracking-wider text-zinc-700">
                <th className="py-3 px-4">Order Value</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Estimated Transit</th>
                <th className="py-3 px-4">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="py-3 px-4 font-semibold text-zinc-900">$100.00 and above</td>
                <td className="py-3 px-4">SoleX Express Courier</td>
                <td className="py-3 px-4">2–3 Business Days</td>
                <td className="py-3 px-4 font-bold text-emerald-600">FREE</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-zinc-900">Under $100.00</td>
                <td className="py-3 px-4">Standard Priority Post</td>
                <td className="py-3 px-4">3–5 Business Days</td>
                <td className="py-3 px-4 font-semibold text-zinc-900">$10.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold text-zinc-950 pt-4">30-Day Hassle-Free Returns</h2>
        <p>
          We want you to feel complete confidence in your movement. If your new SoleX footwear does not provide the comfort, fit, or aesthetic you anticipated, you may request a full return or size exchange within 30 calendar days of delivery.
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
          <li>Sneakers must be in unworn condition with original shoebox and tags attached.</li>
          <li>We recommend trying shoes on clean indoor surfaces or carpets first.</li>
          <li>Exchanges for alternative sizes are processed with zero restocking fees.</li>
        </ul>
      </div>
    </div>
  );
}
