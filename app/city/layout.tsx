import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anny — Designing from San Francisco",
  description:
    "Anny is a product designer & builder in San Francisco, focused on B2B2C platforms and operational systems.",
  openGraph: {
    title: "Anny — Designing from San Francisco",
    description:
      "Product designer & builder based in SF, focused on B2B2C platforms and operational systems.",
  },
};

export default function CityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
