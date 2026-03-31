import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mark Anthony Tantongco | Neo-Brutalist WebGPU Engineer",
  description: "Elite vibe coder building sentient digital organisms with WebGPU compute, raw brutalist energy, and zero corporate polish. TypeScript, React, Three.js, Next.js.",
  keywords: ["Mark Anthony Tantongco", "WebGPU", "Neo-Brutalist", "React", "Three.js", "Next.js", "TypeScript", "GSAP", "Full Stack Developer"],
  authors: [{ name: "Mark Anthony Tantongco" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Mark Anthony Tantongco | Neo-Brutalist WebGPU Engineer",
    description: "Building sentient digital organisms with bleeding-edge compute",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Anthony Tantongco",
    description: "Neo-Brutalist WebGPU Engineer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
