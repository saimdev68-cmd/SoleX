"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface HeroFrameSequenceProps {
  progress: number;
  onLoaded?: () => void;
  onProgressUpdate?: (progress: number) => void;
}

const TOTAL_FRAMES = 240;

// Generate numerically sorted frame filenames
function getFramePath(index: number): string {
  // index is 1-based (1 to 240)
  const padded = String(index).padStart(3, "0");
  return `/images/frame_${padded}.jpg`;
}

export function HeroFrameSequence({ progress }: HeroFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Draw specific frame onto canvas with proper scaling (contain)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];

    // If target frame hasn't loaded yet, search backwards for nearest loaded frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i]?.naturalWidth) {
          img = imagesRef.current[i];
          break;
        }
      }
      // If still nothing backwards, search forwards
      if (!img || !img.complete) {
        for (let i = frameIndex + 1; i < TOTAL_FRAMES; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i]?.naturalWidth) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate aspect ratio for 100% full-bleed COVER (no sidebars, fills screen completely)
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      // Screen is wider than 16:9 (e.g. widescreen / ultrawide desktop)
      // Scale to fill full width 100% edge-to-edge
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Screen is taller than 16:9 (e.g. mobile / portrait tablet)
      // Scale to fill full height 100% top-to-bottom
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    currentFrameRef.current = frameIndex;
  }, []);

  // Resize canvas for display & device pixel ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // Preload the very first frame immediately
    const firstImg = new window.Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      loadedCount++;
      setLoadPercentage(Math.round((loadedCount / 30) * 100));
      drawFrame(0);
      setIsReady(true);
    };
    firstImg.onerror = () => {
      if (isCancelled) return;
      setHasError(true);
    };

    // Preload initial critical 30 frames (gives instant 0-12% scroll smoothness)
    const initialBatchSize = 30;
    for (let i = 2; i <= initialBatchSize; i++) {
      const img = new window.Image();
      const frameIdx = i - 1;
      img.src = getFramePath(i);
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[frameIdx] = img;
        loadedCount++;
        setLoadPercentage(Math.min(Math.round((loadedCount / initialBatchSize) * 100), 100));
      };
    }

    // Stream the remaining frames in background after a brief tick
    const timer = setTimeout(() => {
      if (isCancelled) return;
      for (let i = initialBatchSize + 1; i <= TOTAL_FRAMES; i++) {
        const img = new window.Image();
        const frameIdx = i - 1;
        img.src = getFramePath(i);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[frameIdx] = img;
        };
      }
    }, 400);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [drawFrame]);

  // Handle window resize
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Render on scroll progress change via requestAnimationFrame
  useEffect(() => {
    const targetFrame = Math.max(
      0,
      Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)
    );

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      drawFrame(targetFrame);
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [progress, drawFrame]);

  // Fallback if sequence failed
  if (hasError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-[#FBFBFA]">
        <div className="relative w-4/5 max-w-2xl aspect-video">
          <Image
            src="/images/frame_001.jpg"
            alt="SoleX Performance Sneaker"
            fill
            priority
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Canvas for zero-flicker hardware accelerated sequence */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block pointer-events-none transition-opacity duration-500"
        style={{ opacity: isReady ? 1 : 0 }}
      />

      {/* Branded Loader screen overlay during initial frame decode */}
      {!isReady && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#FBFBFA] space-y-4">
          <div className="text-3xl font-black tracking-tighter text-zinc-950">
            SOLE<span className="text-orange-600">X</span>
          </div>
          <div className="w-48 bg-zinc-200 h-1 rounded-full overflow-hidden">
            <div
              className="bg-zinc-950 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.max(loadPercentage, 15)}%` }}
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Loading {loadPercentage}%
          </p>
        </div>
      )}
    </div>
  );
}
