import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Orlando Itinerary",
  description:
    "Your personalized Orlando vacation itinerary — day-by-day schedule with park strategies, dining picks, and insider tips from Katie.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/results",
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
