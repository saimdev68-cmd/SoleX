"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { createLocalOrder } from "@/lib/orders";
import { UserAddress } from "@/data/users";
import { AddressForm } from "@/components/checkout/AddressForm";
import { PaymentMethod } from "@/components/checkout/PaymentMethod";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function CheckoutForm() {
  const router = useRouter();
  const { user, updateUserAddress, isAuthenticated } = useAuth();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { showToast } = useToast();

  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState<UserAddress>({
    fullName: user?.name || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    province: user?.address?.province || "",
    postalCode: user?.address?.postalCode || "",
    phone: user?.phone || user?.address?.phone || "",
    notes: user?.address?.notes || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync user profile address if available
  useEffect(() => {
    if (user) {
      if (user.email && !email) setEmail(user.email);
      if (user.address) {
        setAddress((prev) => ({
          fullName: prev.fullName || user.name,
          street: prev.street || user.address?.street || "",
          city: prev.city || user.address?.city || "",
          province: prev.province || user.address?.province || "",
          postalCode: prev.postalCode || user.address?.postalCode || "",
          phone: prev.phone || user.phone || user.address?.phone || "",
          notes: prev.notes || user.address?.notes || "",
        }));
      }
    }
  }, [user, email]);

  const handleAddressChange = (updated: Partial<UserAddress>) => {
    setAddress((prev) => ({ ...prev, ...updated }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      showToast("Your cart is empty. Please add items before checking out.", "error");
      router.push("/shop");
      return;
    }

    const newErrors: Record<string, string> = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email for order delivery updates";
    }
    if (!address.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!address.phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.street.trim()) newErrors.street = "Street address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.province.trim()) newErrors.province = "Province / State is required";
    if (!address.postalCode.trim()) newErrors.postalCode = "Postal / Zip code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please complete all required fields", "error");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      if (isAuthenticated) {
        updateUserAddress(address);
      }

      // Create local demo order
      const order = createLocalOrder(items, subtotal, shipping, address);

      // Clear cart
      clearCart();

      showToast("Order placed successfully!", "success");

      // Redirect to Order Confirmation page
      router.push(`/order-success?id=${order.id}`);
    } catch {
      showToast("Error processing order. Please try again.", "error");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900">Your bag is empty</h2>
        <p className="text-xs text-zinc-500">
          You don&apos;t have any sneakers in your cart to checkout.
        </p>
        <Link href="/shop" className="inline-block pt-2">
          <Button variant="primary" size="md">
            Return to Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Contact, Shipping, Payment */}
      <div className="lg:col-span-7 space-y-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </Link>

        {/* Contact info banner */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950">
              1. Contact Information
            </h2>
            <span className="text-xs text-zinc-500 font-medium">
              Order confirmation & delivery updates
            </span>
          </div>
          <Input
            label="Email Address for Delivery Notification"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. yourname@example.com"
            error={errors.email}
            autoComplete="email"
          />
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 space-y-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 pb-3 border-b border-zinc-100">
            2. Shipping Address
          </h2>
          <AddressForm
            address={address}
            onChange={handleAddressChange}
            errors={errors}
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 space-y-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 pb-3 border-b border-zinc-100">
            3. Payment Option
          </h2>
          <PaymentMethod />
        </div>
      </div>

      {/* Right Column: Order Summary & Place Order CTA */}
      <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full h-14 rounded-xl text-sm uppercase tracking-wider font-extrabold shadow-lg hover:shadow-xl"
        >
          <Lock className="w-4 h-4" />
          <span>Place Order (Cash on Delivery)</span>
        </Button>

        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Direct Cash on Delivery checkout · Pay when your sneakers arrive</span>
          </div>
          <p className="text-[11px] text-zinc-400">
            By placing your order, you agree to SoleX Terms of Sale and 30-Day Return Policies.
          </p>
        </div>
      </div>
    </form>
  );
}
