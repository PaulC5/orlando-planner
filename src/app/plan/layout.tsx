import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Orlando Trip",
  description:
    "Answer 11 quick questions about your group, dates, and park preferences. Katie builds you a personalized Orlando itinerary in minutes.",
  alternates: {
    canonical: "/plan",
  },
};

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
