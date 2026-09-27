"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the Terms of Service";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await register(name, email, password);
      showToast("Account created successfully! Welcome to SoleX.", "success");
      router.push(redirectUrl);
    } catch {
      showToast("Unable to create account. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl border border-zinc-200/80 shadow-card">
      <div className="text-center mb-8 space-y-1">
        <h1 className="text-2xl font-black tracking-tight text-zinc-950">
          Create Member Account
        </h1>
        <p className="text-xs text-zinc-500">
          Join SoleX for order tracking, wishlist syncing, and member releases.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Jordan Miller"
          error={errors.name}
          autoComplete="name"
        />

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. jordan@example.com"
          error={errors.email}
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          error={errors.password}
          autoComplete="new-password"
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat password"
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-zinc-600">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 h-3.5 w-3.5 mt-0.5"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-zinc-950 underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-zinc-950 underline font-medium">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && <p className="text-xs text-red-600 mt-1 font-medium">{errors.terms}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full rounded-xl text-xs uppercase tracking-wider font-bold mt-2"
        >
          Create Account
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-zinc-100 text-center text-xs text-zinc-500">
        Already have a SoleX account?{" "}
        <Link
          href={`/login${redirectUrl !== "/account" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
          className="font-bold text-zinc-900 hover:text-orange-600 underline underline-offset-4"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
