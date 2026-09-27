import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 sm:px-6">
      <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 mb-6">
        <Compass className="w-8 h-8 text-orange-600 animate-spin" style={{ animationDuration: "12s" }} />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">
        Error 404
      </span>
      <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 mb-3">
        Looks like you took a wrong step.
      </h1>
      <p className="text-sm sm:text-base text-zinc-600 max-w-md mx-auto mb-8 leading-relaxed">
        The sneaker or page you&apos;re looking for doesn&apos;t exist, has been retired, or moved to a new route.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button variant="primary" size="lg" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back Home</span>
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="outline" size="lg" className="rounded-full">
            Browse All Sneakers
          </Button>
        </Link>
      </div>
    </div>
  );
}
