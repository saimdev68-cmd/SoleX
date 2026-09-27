import React from "react";
import { Banknote, ShieldCheck } from "lucide-react";

export function PaymentMethod() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
          Payment Method
        </h3>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Verified Demo Mode
        </span>
      </div>

      <div className="relative border-2 border-zinc-950 bg-zinc-50/60 rounded-xl p-4 flex items-start gap-3.5 transition-all">
        <div className="p-2 rounded-lg bg-zinc-950 text-white shrink-0 mt-0.5">
          <Banknote className="w-5 h-5 text-orange-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-950">
              Cash on Delivery (COD)
            </span>
            <span className="w-4 h-4 rounded-full border-4 border-zinc-950 bg-white" />
          </div>
          <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
            Pay safely with physical cash or card upon package arrival at your door. No upfront online payment required.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>SoleX Buyer Guarantee: Inspect before payment upon delivery.</span>
      </div>
    </div>
  );
}
