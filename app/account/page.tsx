"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Heart,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { getLocalOrders, Order } from "@/lib/orders";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export default function AccountPage() {
  const { wishlistCount } = useWishlist();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getLocalOrders());
  }, []);

  const latestAddress = orders[0]?.shippingAddress;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-zinc-200/80 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            Fulfillment Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mt-1">
            My Orders & Delivery Tracking
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Track active packages, Cash on Delivery status, and past purchases.
          </p>
        </div>

        <Link href="/shop">
          <Button variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>

      {/* Quick Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Total Orders</span>
            <h3 className="text-xl font-black text-zinc-950">{orders.length}</h3>
          </div>
        </div>

        <Link
          href="/wishlist"
          className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-subtle flex items-center justify-between hover:border-zinc-300 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 font-medium">Saved Wishlist</span>
              <h3 className="text-xl font-black text-zinc-950">{wishlistCount} items</h3>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-zinc-950 transition-all" />
        </Link>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Payment Method</span>
            <h3 className="text-xl font-black text-zinc-950">Cash on Delivery</h3>
          </div>
        </div>
      </div>

      {/* Main Columns: Order History & Saved Address */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Order History */}
        <div id="orders" className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-950">Order History</h2>
            <span className="text-xs text-zinc-400">{orders.length} total orders</span>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-200/80 p-8 text-center space-y-3">
              <Package className="w-10 h-10 text-zinc-400 mx-auto" />
              <h4 className="text-sm font-bold text-zinc-900">No orders placed yet</h4>
              <p className="text-xs text-zinc-500">
                When you place a Cash on Delivery order, your package details and delivery tracking will appear here.
              </p>
              <div className="pt-2">
                <Link href="/shop">
                  <Button variant="primary" size="sm">
                    Explore Sneakers
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-zinc-200/80 p-6 space-y-4 shadow-subtle hover:border-zinc-300 transition-colors"
                >
                  {/* Order summary bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 text-xs gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono font-bold text-zinc-900 bg-zinc-100 px-2 py-1 rounded-md">
                        #{order.id}
                      </span>
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500">{order.paymentMethod}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-zinc-100">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-12 h-12 bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover w-full h-full"
                              sizes="48px"
                            />
                          </div>
                          <div className="truncate">
                            <Link
                              href={`/products/${item.slug}`}
                              className="text-xs font-semibold text-zinc-900 hover:text-orange-600 truncate block"
                            >
                              {item.name}
                            </Link>
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

                  {/* Total & Delivery Address footnote */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-zinc-100 text-xs text-zinc-500 gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">
                        {order.shippingAddress.street}, {order.shippingAddress.city}
                      </span>
                    </div>
                    <div className="text-right font-extrabold text-sm text-zinc-950">
                      Total: {formatPrice(order.total)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Delivery Address */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-zinc-200/80 space-y-4 shadow-subtle lg:sticky lg:top-24">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              Delivery Destination
            </h3>
          </div>

          {latestAddress ? (
            <div className="text-xs text-zinc-600 space-y-1.5 leading-relaxed">
              <p className="font-bold text-zinc-950 text-sm">{latestAddress.fullName}</p>
              <p>{latestAddress.street}</p>
              <p>
                {latestAddress.city}, {latestAddress.province} {latestAddress.postalCode}
              </p>
              <p className="text-zinc-500">Phone: {latestAddress.phone}</p>
              {latestAddress.notes && (
                <p className="italic text-zinc-400 pt-1">
                  &ldquo;{latestAddress.notes}&rdquo;
                </p>
              )}
              <div className="pt-3">
                <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Cash on Delivery Ready
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-zinc-500 py-3 space-y-2">
              <p>Your delivery address will appear here once you place your first order.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
