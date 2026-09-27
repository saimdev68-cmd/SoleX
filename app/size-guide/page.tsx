import React from "react";
import { Ruler, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Footwear Sizing Chart & Fitting Guide — SoleX",
  description: "Official conversion guide for Men and Women US, UK, EU, and CM footwear sizing.",
};

export default function SizeGuidePage() {
  const menSizes = [
    { us: "7.0", uk: "6.0", eu: "40.0", cm: "25.0" },
    { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" },
    { us: "8.0", uk: "7.0", eu: "41.0", cm: "26.0" },
    { us: "8.5", uk: "7.5", eu: "42.0", cm: "26.5" },
    { us: "9.0", uk: "8.0", eu: "42.5", cm: "27.0" },
    { us: "9.5", uk: "8.5", eu: "43.0", cm: "27.5" },
    { us: "10.0", uk: "9.0", eu: "44.0", cm: "28.0" },
    { us: "10.5", uk: "9.5", eu: "44.5", cm: "28.5" },
    { us: "11.0", uk: "10.0", eu: "45.0", cm: "29.0" },
    { us: "11.5", uk: "10.5", eu: "45.5", cm: "29.5" },
    { us: "12.0", uk: "11.0", eu: "46.5", cm: "30.0" },
  ];

  const womenSizes = [
    { us: "5.5", uk: "3.5", eu: "36.0", cm: "22.5" },
    { us: "6.0", uk: "4.0", eu: "36.5", cm: "23.0" },
    { us: "6.5", uk: "4.5", eu: "37.5", cm: "23.5" },
    { us: "7.0", uk: "5.0", eu: "38.0", cm: "24.0" },
    { us: "7.5", uk: "5.5", eu: "38.5", cm: "24.5" },
    { us: "8.0", uk: "6.0", eu: "39.0", cm: "25.0" },
    { us: "8.5", uk: "6.5", eu: "40.0", cm: "25.5" },
    { us: "9.0", uk: "7.0", eu: "40.5", cm: "26.0" },
    { us: "9.5", uk: "7.5", eu: "41.0", cm: "26.5" },
    { us: "10.0", uk: "8.0", eu: "42.0", cm: "27.0" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
          Precision Fit
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          SoleX Footwear Size Guide
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Find your exact athletic fit with international conversions in US, UK, EU, and Centimeters.
        </p>
      </div>

      {/* Measurement Instructions */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8 shadow-card space-y-4">
        <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
          <Ruler className="w-5 h-5 text-orange-600" />
          How to Measure Your Foot Length
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-zinc-600 pt-2">
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">1</span>
            <strong className="block text-zinc-900 font-semibold">Step on Paper</strong>
            <p>Place a sheet of blank paper against a flat wall. Stand barefoot on it with your heel firmly touching the wall.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">2</span>
            <strong className="block text-zinc-900 font-semibold">Mark the Longest Toe</strong>
            <p>Using a pencil held perpendicular, mark the furthest point of your longest toe onto the paper.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">3</span>
            <strong className="block text-zinc-900 font-semibold">Measure Distance</strong>
            <p>Use a millimeter ruler to measure from the edge of the paper to your mark and compare with our CM column below.</p>
          </div>
        </div>
      </div>

      {/* Men Table */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8 shadow-card space-y-4">
        <h2 className="text-xl font-bold text-zinc-950">Men&apos;s Footwear Conversions</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-700">
                <th className="py-3 px-4">US Men</th>
                <th className="py-3 px-4">UK</th>
                <th className="py-3 px-4">EU</th>
                <th className="py-3 px-4">Foot Length (CM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
              {menSizes.map((row) => (
                <tr key={row.us} className="hover:bg-zinc-50/60">
                  <td className="py-2.5 px-4 font-bold text-zinc-900">US {row.us}</td>
                  <td className="py-2.5 px-4">{row.uk}</td>
                  <td className="py-2.5 px-4">{row.eu}</td>
                  <td className="py-2.5 px-4 font-semibold text-zinc-700">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Women Table */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8 shadow-card space-y-4">
        <h2 className="text-xl font-bold text-zinc-950">Women&apos;s Footwear Conversions</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-700">
                <th className="py-3 px-4">US Women</th>
                <th className="py-3 px-4">UK</th>
                <th className="py-3 px-4">EU</th>
                <th className="py-3 px-4">Foot Length (CM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
              {womenSizes.map((row) => (
                <tr key={row.us} className="hover:bg-zinc-50/60">
                  <td className="py-2.5 px-4 font-bold text-zinc-900">US {row.us}</td>
                  <td className="py-2.5 px-4">{row.uk}</td>
                  <td className="py-2.5 px-4">{row.eu}</td>
                  <td className="py-2.5 px-4 font-semibold text-zinc-700">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
