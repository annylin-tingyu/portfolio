import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Source_Serif_4, Caveat, Architects_Daughter } from "next/font/google";
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

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-skills",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
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
      <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${sourceSerif.variable} ${caveat.variable} ${architectsDaughter.variable}`}>
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/sometype-mono"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-black font-sans antialiased">
        <CustomCursor />
        <SiteHeader />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
