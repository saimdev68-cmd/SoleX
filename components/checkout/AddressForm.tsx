"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { UserAddress } from "@/data/users";

interface AddressFormProps {
  address: UserAddress;
  onChange: (updated: Partial<UserAddress>) => void;
  errors: Record<string, string>;
}

export function AddressForm({ address, onChange, errors }: AddressFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={address.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder="e.g. Demo User"
          error={errors.fullName}
          autoComplete="name"
        />

        <Input
          label="Phone Number"
          type="tel"
          value={address.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="e.g. +1 (555) 234-5678"
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <Input
        label="Delivery Street Address"
        value={address.street}
        onChange={(e) => onChange({ street: e.target.value })}
        placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
        error={errors.street}
        autoComplete="street-address"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="City"
          value={address.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="e.g. Seattle"
          error={errors.city}
          autoComplete="address-level2"
        />

        <Input
          label="Province / State"
          value={address.province}
          onChange={(e) => onChange({ province: e.target.value })}
          placeholder="e.g. Washington"
          error={errors.province}
          autoComplete="address-level1"
        />

        <Input
          label="Postal / Zip Code"
          value={address.postalCode}
          onChange={(e) => onChange({ postalCode: e.target.value })}
          placeholder="e.g. 98101"
          error={errors.postalCode}
          autoComplete="postal-code"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="delivery-notes"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-700"
        >
          Delivery Instructions (Optional)
        </label>
        <textarea
          id="delivery-notes"
          rows={2}
          value={address.notes || ""}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="e.g. Ring doorbell, leave on front porch"
          className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
        />
      </div>
    </div>
  );
}
