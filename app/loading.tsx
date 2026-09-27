import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="text-3xl font-black tracking-tighter text-zinc-950 animate-pulse">
        SOLE<span className="text-orange-600">X</span>
      </div>
      <div className="w-32 bg-zinc-200 h-1 rounded-full overflow-hidden">
        <div className="bg-zinc-950 h-full rounded-full animate-indeterminate" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        Loading SoleX...
      </p>
    </div>
  );
}
