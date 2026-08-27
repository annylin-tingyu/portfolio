import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Sora, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { CustomCursor } from "@/components/CustomCursor";
import { LayoutShell } from "@/components/LayoutShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

// City (San Francisco) home page — Nordic Bakery type system
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Anny Lin",
  description: "Turning product complexity into clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${sora.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-white text-black font-sans antialiased">
        <CustomCursor />
        <SiteHeader />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
