"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { UserCheck, Sparkles } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const { login, loginAsDemo } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await login(email, password);
      showToast("Welcome back to SoleX!", "success");
      router.push(redirectUrl);
    } catch {
      showToast("Unable to log in. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    showToast("Signed in as Demo User", "success");
    router.push(redirectUrl);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl border border-zinc-200/80 shadow-card">
      <div className="text-center mb-8 space-y-1">
        <h1 className="text-2xl font-black tracking-tight text-zinc-950">
          Sign In to SoleX
        </h1>
        <p className="text-xs text-zinc-500">
          Access your member orders, wishlist, and express checkout.
        </p>
      </div>

      {/* One-Click Demo User Access Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-3 px-4 rounded-xl bg-orange-50 hover:bg-orange-100/80 border border-orange-200 text-orange-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors group"
        >
          <Sparkles className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" />
          <span>Instant One-Click Demo Sign In</span>
        </button>
      </div>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200" />
        </div>
        <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold">
          or with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. demo@solex.com"
          error={errors.email}
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          error={errors.password}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950 h-3.5 w-3.5"
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            onClick={() => {
              setForgotSubmitted(false);
              setForgotEmail(email || "demo@solex.com");
              setIsForgotModalOpen(true);
            }}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full rounded-xl text-xs uppercase tracking-wider font-bold mt-2"
        >
          Sign In
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-zinc-100 text-center text-xs text-zinc-500">
        Don&apos;t have a SoleX account yet?{" "}
        <Link
          href={`/register${redirectUrl !== "/account" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
          className="font-bold text-zinc-900 hover:text-orange-600 underline underline-offset-4"
        >
          Join Member Club
        </Link>
      </div>

      {/* Forgot Password Demo Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title="Reset Password"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-zinc-600">
          {!forgotSubmitted ? (
            <>
              <p>
                Enter your email address and we&apos;ll send you a password reset simulation link.
              </p>
              <Input
                label="Email"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <div className="pt-2">
                <Button
                  onClick={() => setForgotSubmitted(true)}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Send Reset Link
                </Button>
              </div>
            </>
          ) : (
            <div className="py-4 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-zinc-900">Demo Reset Link Generated</h4>
              <p className="text-xs text-zinc-500">
                In this demo environment, no email is sent. You can sign in immediately using <strong>demo@solex.com</strong> or your registered email with any password.
              </p>
              <Button
                onClick={() => setIsForgotModalOpen(false)}
                variant="secondary"
                size="sm"
                className="mt-2"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
