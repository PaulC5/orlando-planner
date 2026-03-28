import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://www.orlandounpacked.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Orlando Unpacked | Free AI-Powered Family Vacation Planner",
    template: "%s | Orlando Unpacked",
  },
  description:
    "Get a personalized, day-by-day Orlando vacation itinerary in 5 minutes — free. Katie, your AI concierge, plans around your family, budget, and parks so you skip the guesswork.",
  keywords: [
    "Orlando vacation planner",
    "Orlando itinerary generator",
    "Disney World trip planner",
    "Universal Orlando itinerary",
    "Orlando family vacation",
    "Disney trip planning",
    "AI travel planner",
    "free Orlando itinerary",
    "Orlando trip planner for families",
    "Kissimmee vacation planning",
  ],
  authors: [{ name: "Orlando Unpacked" }],
  creator: "Orlando Unpacked",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Orlando Unpacked",
    title: "Your Orlando Trip, Planned in 5 Minutes — Free",
    description:
      "Tell Katie about your crew, your budget, and your vibe. She builds you a day-by-day Orlando itinerary with insider tips you won't find on Google.",
    images: [
      {
        url: "/katie-hero.png",
        width: 1200,
        height: 630,
        alt: "Katie — Your AI Orlando Travel Concierge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Orlando Trip, Planned in 5 Minutes — Free",
    description:
      "Tell Katie about your crew and she builds a day-by-day Orlando itinerary with local insider tips. No signup required.",
    images: ["/katie-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "n8FrxjRiptwwIwnkbeZ86UPAMH6nLarMhKBNabSRh04",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f97316" />
        <link rel="apple-touch-icon" href="/katie-avatar.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Orlando Unpacked",
              url: siteUrl,
              description:
                "Free AI-powered Orlando vacation planner that creates personalized, day-by-day itineraries for families.",
              applicationCategory: "TravelApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "Orlando Unpacked",
                url: siteUrl,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does the Orlando Unpacked trip planner work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Answer a few quick questions about your group, dates, budget, and park preferences. Katie, our AI concierge, generates a personalized day-by-day Orlando itinerary with insider tips, dining recommendations, and crowd strategies — all in about 5 minutes.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Orlando Unpacked free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, completely free. No signup, no credit card, no hidden fees. You get a full day-by-day itinerary and can tweak it as many times as you like.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What parks does Orlando Unpacked cover?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Katie plans trips for Magic Kingdom, EPCOT, Hollywood Studios, Animal Kingdom, Universal Studios, Islands of Adventure, SeaWorld, and LEGOLAND — plus non-park days, rest days, and local Kissimmee tips.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
