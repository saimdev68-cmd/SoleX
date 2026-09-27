"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { getOrderById, Order } from "@/lib/orders";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const found = getOrderById(orderId);
      if (found) {
        setOrder(found);
      }
    }
  }, [orderId]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
      {/* Success Badge & Headline */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-in zoom-in-75">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Order Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mt-1">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-md mx-auto">
            Your sneaker order has been registered in our logistics queue. Our fulfillment team is preparing your package for express dispatch.
          </p>
        </div>

        {orderId && (
          <div className="inline-block bg-zinc-100 px-4 py-2 rounded-xl text-xs font-mono font-bold text-zinc-900 border border-zinc-200">
            Order Reference: #{orderId}
          </div>
        )}
      </div>

      {/* Order Details Card */}
      {order ? (
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-card p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-zinc-100 text-xs">
            <div>
              <span className="text-zinc-400 block font-semibold uppercase text-[10px]">
                Order Date
              </span>
              <strong className="text-zinc-800">
                {new Date(order.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </strong>
            </div>
            <div>
              <span className="text-zinc-400 block font-semibold uppercase text-[10px]">
                Payment Option
              </span>
              <strong className="text-zinc-800 flex items-center gap-1">
                <span>{order.paymentMethod}</span>
              </strong>
            </div>
            <div>
              <span className="text-zinc-400 block font-semibold uppercase text-[10px]">
                Fulfillment Status
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <Truck className="w-3 h-3" /> {order.status}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="text-xs text-zinc-600 space-y-1">
            <h4 className="font-bold uppercase tracking-wider text-zinc-900 text-xs mb-2">
              Delivery Destination
            </h4>
            <p className="font-semibold text-zinc-900">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
              {order.shippingAddress.postalCode}
            </p>
            <p>Phone: {order.shippingAddress.phone}</p>
            {order.shippingAddress.notes && (
              <p className="italic text-zinc-500 pt-1">
                Note: &ldquo;{order.shippingAddress.notes}&rdquo;
              </p>
            )}
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3 pt-4 border-t border-zinc-100">
            <h4 className="font-bold uppercase tracking-wider text-zinc-900 text-xs">
              Purchased Models ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </h4>
            <div className="divide-y divide-zinc-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-lg bg-zinc-50 border border-zinc-200 overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover w-full h-full"
                        sizes="48px"
                      />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-zinc-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-zinc-500">
                        Qty: {item.quantity} · US {item.size} · {item.color}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-900 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-1.5 pt-4 border-t border-zinc-100 text-xs text-zinc-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-900">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span className="font-semibold text-zinc-900">
                {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-zinc-950 pt-2 border-t border-zinc-100">
              <span>Amount Due on Delivery</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-8 text-center space-y-3">
          <Package className="w-10 h-10 text-zinc-400 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-900">Your order has been recorded</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Payment will be collected in cash upon arrival. You can track this order inside your SoleX Account dashboard.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/shop" className="w-full sm:w-auto">
          <Button variant="primary" size="lg" className="w-full rounded-full">
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        <Link href="/account#orders" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full rounded-full">
            View Order in Account
          </Button>
        </Link>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Demo order confirmation · No charges made to any credit card</span>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Loading order confirmation...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
