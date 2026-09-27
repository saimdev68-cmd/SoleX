import React, { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm hover:shadow",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200/80",
      outline:
        "border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100/80",
      ghost:
        "bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
      dark:
        "bg-black text-white hover:bg-zinc-900",
      danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    };

    const sizes = {
      sm: "min-h-[38px] px-4 py-2 text-xs rounded-lg uppercase tracking-wider font-bold gap-1.5",
      md: "min-h-[46px] px-6 py-2.5 text-sm rounded-xl font-semibold gap-2",
      lg: "min-h-[52px] px-7 sm:px-8 py-3.5 text-sm sm:text-base rounded-xl sm:rounded-2xl font-bold tracking-wide gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
