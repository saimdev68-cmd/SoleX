import React from "react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — SoleX",
  description: "Complete your order with Cash on Delivery at SoleX.",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
          Express Checkout
        </span>
        <h1 className="text-3xl font-black text-zinc-950 tracking-tight mt-1">
          Delivery & Payment
        </h1>
      </div>

      <CheckoutForm />
    </div>
  );
}
