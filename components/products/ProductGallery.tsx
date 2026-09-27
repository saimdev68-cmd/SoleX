"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  activeColorName?: string;
}

export function ProductGallery({ images, productName, activeColorName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [gallerySrc, setGallerySrc] = useState<string | null>(null);

  // When color variant changes, reset gallery to first photo of that variant
  React.useEffect(() => {
    setSelectedIndex(0);
    setGallerySrc(null);
  }, [images]);

  const displayImages = images && images.length > 0 ? images : ["/products/solex-air-one-1.jpg"];
  const activeImage = displayImages[selectedIndex] || displayImages[0];

  const angleLabels = ["Profile View", "Quarter Angle", "Sole Traction", "Rear Heel"];

  return (
    <div className="space-y-4">
      {/* Main Feature Display */}
      <div className="relative aspect-square w-full bg-zinc-100 rounded-2xl border border-zinc-200/80 overflow-hidden group">
        <Image
          src={gallerySrc || activeImage}
          alt={`${productName} - ${angleLabels[selectedIndex] || "Angle view"}`}
          fill
          priority
          onError={() => setGallerySrc("/products/solex-air-one-1.jpg")}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Zoom trigger */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-zinc-950 shadow-sm border border-zinc-200/80 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Enlarge sneaker photo"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          {activeColorName && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-600 text-white px-2.5 py-1 rounded-md shadow-sm">
              {activeColorName}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md shadow-sm">
            {angleLabels[selectedIndex] || `Angle ${selectedIndex + 1}`}
          </span>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 gap-3">
        {displayImages.map((img, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square rounded-xl bg-zinc-100 border overflow-hidden transition-all ${
                isSelected
                  ? "border-zinc-950 ring-2 ring-zinc-950 ring-offset-1"
                  : "border-zinc-200 hover:border-zinc-400"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover w-full h-full"
                sizes="120px"
              />
            </button>
          );
        })}
      </div>

      {/* Fullscreen Zoom Modal */}
      <Modal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        title={`${productName} — Detailed Inspection`}
        maxWidth="2xl"
      >
        <div className="relative aspect-square sm:aspect-[4/3] w-full bg-zinc-100 rounded-xl overflow-hidden">
          <Image
            src={activeImage}
            alt={productName}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 1200px) 100vw, 800px"
          />
        </div>
      </Modal>
    </div>
  );
}
