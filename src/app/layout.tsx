import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orlando Trip Planner | AI-Powered Family Vacation Planning",
  description:
    "Get a personalized Orlando vacation itinerary in minutes. Built by local experts who've helped hundreds of families plan the perfect Disney and Universal trip.",
  keywords: [
    "Orlando vacation planner",
    "Disney World itinerary",
    "Universal Orlando trip",
    "Orlando family vacation",
    "Disney trip planning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
