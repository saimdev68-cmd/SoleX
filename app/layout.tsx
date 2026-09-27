import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://solex.shoes"),
  title: "SoleX — Sneakers Built to Move",
  description:
    "Discover SoleX sneakers designed for movement, comfort, and everyday style. Precision-engineered footwear featuring dynamic responsive cushioning.",
  keywords: [
    "SoleX",
    "sneakers",
    "running shoes",
    "lifestyle sneakers",
    "performance footwear",
    "athletic shoes",
  ],
  authors: [{ name: "SoleX Design Lab" }],
  openGraph: {
    title: "SoleX — Sneakers Built to Move",
    description: "Discover SoleX sneakers designed for movement, comfort, and everyday style.",
    url: "https://solex.shoes",
    siteName: "SoleX Footwear",
    images: [
      {
        url: "/images/frame_001.jpg",
        width: 1280,
        height: 720,
        alt: "SoleX Signature Performance Footwear",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoleX — Sneakers Built to Move",
    description: "Discover SoleX sneakers designed for movement, comfort, and everyday style.",
    images: ["/images/frame_001.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#0A0A0A] antialiased">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AnnouncementBar />
                <Navbar />
                <main className="flex-1 flex flex-col">{children}</main>
                <Footer />
                <CartDrawer />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
